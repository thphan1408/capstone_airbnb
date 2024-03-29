import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream'); // Thư viện khá lâu chưa update, nên phải import ECMAScript 5

// Tạo function upload file lên cloudinary
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      // Check if the size of the file is more than 1M
      if (file.size > 1000000) {
        throw new Error('Please upload a file size not more than 1M');
      }

      // Check if the file is an image
      if (!file.mimetype.startsWith('image')) {
        throw new Error('Sorry, this file is not an image, please try again');
      }

      return new Promise((resolver, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            folder: folder,
          },
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolver(result);
          },
        );
        toStream(file.buffer).pipe(upload); // upload file lên cloudinary
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // upload nhiều file lên cloudinary
  async uploadImages(
    files: Array<Express.Multer.File>,
    folder: string,
  ): Promise<(UploadApiResponse | UploadApiErrorResponse)[]> {
    try {
      // if (!files || files.length === 0) {
      //   throw new NotFoundException('No files uploaded');
      // }
      const promises = files.map((file) => this.uploadImage(file, folder));
      return await Promise.all(promises);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Xóa file trên cloudinary
  async deleteImage(public_id: string): Promise<any> {
    try {
      const result = await v2.uploader.destroy(public_id);
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Xóa nhiều file trên cloudinary
  async deleteImages(public_ids: string[]): Promise<any> {
    try {
      const promises = public_ids.map((public_id) =>
        this.deleteImage(public_id),
      );
      return await Promise.all(promises);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
