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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fileUploadRoomDto from './dto/fileUploadRoom.dto';
import { query } from 'express';
import { UseImageUploadInterceptor } from 'src/utils/uploadFile';

@ApiTags('Rooms')
@Controller('api')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

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

  @Post('/phong-thue/upload-hinh-phong')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: fileUploadRoomDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseImageUploadInterceptor(`${process.env.RELATIVE_UPLOAD_PATH}/rooms`)
  @ApiQuery({ name: 'id', required: true, type: Number })
  async uploadImageRoom(
    @Query('id') id,
    @UploadedFile() file,
    @Res() response,
  ): Promise<any> {
    const data = await this.roomsService.uploadImageRoom(id, file);
    response.status(data.status).json(data);
  }
}
