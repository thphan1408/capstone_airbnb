import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream'); // Thư viện khá lâu chưa update, nên phải import ECMAScript 5

// Tạo function upload file lên cloudinary
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolver, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        }
        resolver(result);
      });
      toStream(file.buffer).pipe(upload); // upload file lên cloudinary
    });
  }
}
