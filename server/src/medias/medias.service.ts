import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { UploadMediasInput } from './dto/upload-medias.input';

@Injectable()
export class MediasService {
  async uploadMedias({ base64EncodedImages, folder }: UploadMediasInput) {
    const images = [];
    for (let i = 0; i < base64EncodedImages.length; i++) {
      const uploadedImage = await v2.uploader.upload(base64EncodedImages[i], {
        folder,
        resource_type: 'image',
      });
      images.push(uploadedImage);
    }
    return images;
  }
}
