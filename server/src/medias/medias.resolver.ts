import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MediasService } from './medias.service';
import { Media } from './entities/media.entity';
import { UploadMediasInput } from './dto/upload-medias.input';
import { UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/auth/is-authenticated.guard';

@Resolver(() => Media)
@UseGuards(IsAuthenticatedGuard)
export class MediasResolver {
  constructor(private readonly mediasService: MediasService) {}
  @Mutation(() => [Media])
  uploadMedias(
    @Args('uploadMediasInput') uploadMediasInput: UploadMediasInput,
  ) {
    return this.mediasService.uploadMedias(uploadMediasInput);
  }
}
