import { Args, Query, Resolver } from '@nestjs/graphql';
import { ElasticsearchService } from './elasticsearch.service';
import { SearchResults } from './entities/search-results.entity';
import { UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/auth/is-authenticated.guard';

@UseGuards(IsAuthenticatedGuard)
@Resolver(() => SearchResults)
export class ElasticsearchResolver {
  constructor(private readonly elasticSearchService: ElasticsearchService) {}
  @Query(() => SearchResults)
  async search(@Args('q') q: string) {
    return await this.elasticSearchService.find(q);
  }
}
