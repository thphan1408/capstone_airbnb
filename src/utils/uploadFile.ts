import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const UseImageUploadInterceptor = (destinationPath: string) => {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + destinationPath,
        filename: (req, file, cb) => {
          return cb(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  );
};
