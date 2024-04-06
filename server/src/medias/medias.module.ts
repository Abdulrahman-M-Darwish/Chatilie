import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasResolver } from './medias.resolver';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryProvider, MediasResolver, MediasService],
})
export class MediasModule {}
