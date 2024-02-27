import { Test, TestingModule } from '@nestjs/testing';
import { MediasResolver } from './medias.resolver';
import { MediasService } from './medias.service';

describe('MediasResolver', () => {
  let resolver: MediasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediasResolver, MediasService],
    }).compile();

    resolver = module.get<MediasResolver>(MediasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
