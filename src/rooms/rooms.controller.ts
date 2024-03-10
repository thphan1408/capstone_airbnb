import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoomDto } from './dto/createRoom.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileUploadRoomDto } from './dto/fileUploadRoom.dto';
import { UseImageUploadInterceptor } from 'src/utils/uploadFile';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateImagesRoomDto } from './dto/createImagesRoom.dto';

@ApiTags('Rooms')
@Controller('api')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('/phong-thue')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async getListRooms(
    @Query('page') page,
    @Query('size') size,
    @Query('keyword') keyword,
    @Res() response,
  ): Promise<any> {
    const data = await this.roomsService.getListRooms(page, size, keyword);
    response.status(data.status).json(data);
  }

  @Post('phong-thue')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateRoomDto })
  async createRoom(@Body() body: CreateRoomDto, @Res() response): Promise<any> {
    const data = await this.roomsService.createRoom(body);
    response.status(data.status).json(data);
  }

  @Get('/phong-thue/vi-tri/:ma_vi_tri')
  @ApiParam({ name: 'ma_vi_tri', required: true, type: Number })
  async getRoomByLocation(
    @Param('ma_vi_tri') ma_vi_tri,
    @Res() response,
  ): Promise<any> {
    const data = await this.roomsService.getRoomByLocation(ma_vi_tri);
    response.status(data.status).json(data);
  }

  @Get('/phong-thue/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getRoomById(@Param('id') id, @Res() response): Promise<any> {
    const data = await this.roomsService.getRoomById(id);
    response.status(data.status).json(data);
  }

  @Delete('/phong-thue/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  async deleteRoomById(
    @Param('id') id,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.roomsService.deleteRoomById(token, id);
    response.status(data.status).json(data);
  }

  @Put('/phong-thue/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateRoom(
    @Param('id') id,
    @Body() body: UpdateRoomDto,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.roomsService.updateRoom(token, id, body);
    response.status(data.status).json(data);
  }

  // Multer upload file
  // @Post('/phong-thue/upload-hinh-phong')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: fileUploadRoomDto })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @UseImageUploadInterceptor(`${process.env.RELATIVE_UPLOAD_PATH}/rooms`)
  // @ApiQuery({ name: 'id', required: true, type: Number }
  // async uploadImageRoom(
  //   @Query('id') id,
  //   @UploadedFile() file,
  //   @Res() response,
  // ): Promise<any> {
  //   const data = await this.roomsService.uploadImageRoom(id, file);
  //   response.status(data.status).json(data);
  // }

  // Còn sẽ mở rộng thêm phần này
  // @Post('/phong-thue/upload-hinh-phong')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: fileUploadRoomDto })
  // @ApiQuery({ name: 'id', required: true, type: Number })
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImageRoom(
  //   @UploadedFile('file') file: Express.Multer.File,
  //   @Res() response,
  //   @Query('id') id,
  // ): Promise<any> {
  //   try {
  //     const imageUrl = await this.cloudinaryService.uploadImage(
  //       file,
  //       'Airbnb-clone/rooms',
  //     );

  //     const data = await this.roomsService.uploadImageRoom(id, imageUrl);

  //     if (data.status === 404) {
  //       await this.cloudinaryService.deleteImage(imageUrl.public_id);
  //     }
  //     response.status(data.status).json(data);
  //   } catch (error) {
  //     response.status(500).json({
  //       status: 500,
  //       content: 'Internal Server Error',
  //       message: error,
  //     });
  //   }
  // }

  // upload nhiều file lên cloudinary
  
  @Post('/phong-thue/upload-hinh-phong')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateImagesRoomDto })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @UseInterceptors(FilesInterceptor('files', 5)) // Giới hạn upload tối đa 5 file
  async uploadImagesRoom(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() response,
    @Query('id') id,
  ): Promise<any> {
    try {
      if (!files || files.length === 0 || files.length > 5) {
        return response.status(400).json({
          status: 400,
          content: 'Bad Request',
          message: 'No files uploaded or files uploaded exceed 5 files limit',
        });
      }

      const imageUrl = await this.cloudinaryService.uploadImages(
        files,
        'Airbnb-clone/rooms',
      );

      const data = await this.roomsService.uploadImagesRoom(id, imageUrl);

      if (data.status === 404) {
        await this.cloudinaryService.deleteImages(
          imageUrl.map((item) => item.public_id),
        );
      }
      response.status(data.status).json(data);
    } catch (error) {
      response.status(500).json({
        status: 500,
        content: 'Internal Server Error',
        message: error.message,
      });
    }
  }

  // Update hình ảnh phòng
  @Put('/phong-thue/cap-nhat-hinh-phong/:id_hinh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: fileUploadRoomDto })
  @ApiParam({ name: 'id_hinh', required: true, type: Number })
  @UseInterceptors(FileInterceptor('file'))
  async updateImagesRoom(
    @UploadedFile() file: Express.Multer.File,
    @Res() response,
    @Param('id_hinh') id_hinh,
  ): Promise<any> {
    try {
      if (!file) {
        return response.status(400).json({
          status: 400,
          content: 'Bad Request',
          message: 'No files uploaded',
        });
      }

      // Xóa hình ảnh cũ trên cloudinary
      const oldImage = await this.roomsService.getImagesRoom(id_hinh);
      if (oldImage.status === 404) {
        response.status(oldImage.status).json(oldImage);
      }
      await this.cloudinaryService.deleteImage(oldImage.data.public_id);

      // Tải hình lên cloudinary
      const imageUrl = await this.cloudinaryService.uploadImage(
        file,
        'Airbnb-clone/rooms',
      );

      const data = await this.roomsService.updateImageRoom(id_hinh, imageUrl);

      if (data.status === 404) {
        await this.cloudinaryService.deleteImage(imageUrl.public_id);
      }

      response.status(data.status).json(data);
    } catch (error) {
      response.status(500).json({
        status: 500,
        content: 'Internal Server Error',
        message: error.message,
      });
    }
  }

  // @Delete('/phong-thue/xoa-hinh-phong/:id')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async deleteImageRoom(
  //   @Param('id') id,
  //   @Res() response,
  // ): Promise<any> {
  //   const data = await this.roomsService.deleteImageRoom(id);
  //   response.status(data.status).json(data);
  // }
}
