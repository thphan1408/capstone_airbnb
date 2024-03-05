import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule], // import CloudinaryModule dùng để upload ảnh avatar
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
