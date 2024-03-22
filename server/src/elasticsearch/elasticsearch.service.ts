import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { indices } from './elasticsearch.index';

@Injectable()
export class ElasticsearchService extends Client {
  constructor(private readonly configService: ConfigService) {
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
  addToIndex({ index, document }: { index: string; document: object }) {
    const isIndex = indices.find((i) => i.index == index);
    if (!isIndex) throw new BadRequestException('Index Not Registered');
    for (const val of Object.keys(document)) {
      if (!Object.keys(isIndex.mappings.properties).includes(val))
        delete document[val];
    }
    console.log(Object.keys(document));
    this.index({ index, document });
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
    console.log((results.responses[0] as any).hits.hits);
    console.log((results.responses[1] as any).hits.hits);
    return results;
  }
}
