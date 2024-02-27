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
      const aspectRatio = this.getAspectRatio(
        uploadedImage.width,
        uploadedImage.height,
      );
      uploadedImage.aspectRatio = aspectRatio;
      images.push(uploadedImage);
    }
    return images;
  }
  getAspectRatio(width: number, height: number) {
    const gcd = (...arr: number[]) => {
      const _gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
      return [...arr].reduce((a: number, b: number) => _gcd(a, b));
    };
    const gcdResult = gcd(...[width, height]);
    console.log(gcdResult);
    return `${width / gcdResult} / ${height / gcdResult}`;
  }
}
