import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { indices } from './elasticsearch.index';
import { EntityManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ElasticsearchService extends Client {
  constructor(
    private readonly configService: ConfigService,
    private readonly entityManager: EntityManager,
  ) {
    super({
      auth: {
        apiKey: configService.getOrThrow('ELASTICSEARCH_API_KEY'),
      },
      tls: {
        rejectUnauthorized: false,
      },
      node: configService.getOrThrow('ELASTICSEARCH_NODE'),
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: true,
    });
  }
  @OnEvent('addToIndex')
  addToIndex({ index, document }: { index: string; document: any }) {
    const isIndex = indices.find((i) => i.index == index);
    if (!isIndex) throw new BadRequestException('Index Not Found');
    for (const val of Object.keys(document)) {
      if (!Object.keys(isIndex.mappings.properties).includes(val))
        delete document[val];
    }
    this.index({ index, id: document.id, document });
  }
  async find(q: string) {
    const results = await this.msearch({
      searches: [
        { index: 'users' },
        {
          query: {
            multi_match: { query: q, fields: ['name^2', 'username'] },
          },
        },
        { index: 'posts' },
        {
          query: {
            multi_match: {
              query: q,
              fields: ['text', 'author.name^2', 'author.username'],
            },
          },
        },
      ],
    });
    const usersIds = (results.responses[0] as any).hits.hits.map((doc) => ({
      id: doc._source.id,
    }));
    const posts = (results.responses[1] as any).hits.hits.map(
      (doc) => doc._source,
    );
    const users = await this.entityManager.find(User, {
      where: usersIds,
      relations: { profile: true },
    });
    return { users, posts };
  }
  @OnEvent('updateFromIndex')
  async updateFromIndex({
    index,
    document: { id, ...doc },
  }: {
    index: string;
    document: any;
  }) {
    const isIndex = indices.find((i) => i.index == index);
    if (!isIndex) throw new BadRequestException('Index Not Found');
    await this.update({ index, id, doc });
  }
}
