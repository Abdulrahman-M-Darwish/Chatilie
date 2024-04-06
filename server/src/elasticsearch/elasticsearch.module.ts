import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { indices } from './elasticsearch.index';
import { ElasticsearchResolver } from './elasticsearch.resolver';

@Global()
@Module({
  providers: [ElasticsearchService, ElasticsearchResolver],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule implements OnModuleInit {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async onModuleInit() {
    for (const index of indices) {
      const isExists = await this.elasticsearchService.indices.exists({
        index: index.index,
      });
      if (isExists) continue;
      await this.elasticsearchService.indices.create(index);
    }
  }
}
