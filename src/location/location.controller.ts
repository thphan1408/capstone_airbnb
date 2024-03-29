import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  Body,
  UseGuards,
  Param,
  Req,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLocationDto } from './dto/createLocation.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { UseImageUploadInterceptor } from 'src/utils/uploadFile';
import fileUploadLocationDto from './dto/fileUploadLocation.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Location')
@Controller('api')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('location')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async getListLocation(
    @Query('page') page,
    @Query('size') size,
    @Query('keyword') keyword,
    @Res() response,
  ): Promise<any> {
    const data = await this.locationService.getListLocation(
      page,
      size,
      keyword,
    );
    response.status(data.status).json(data);
  }

  @Post('/location')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateLocationDto })
  async createLocation(
    @Body() body: CreateLocationDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.locationService.createLocation(body);
    response.status(data.status).json(data);
  }

  @Get('/location/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getLocationById(@Param('id') id, @Res() response): Promise<any> {
    const data = await this.locationService.getLocationById(id);
    response.status(data.status).json(data);
  }

  @Put('/location/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateLocationDto })
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateLocation(
    @Param('id') id,
    @Body() body: UpdateLocationDto,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.locationService.updateLocation(id, body, token);
    response.status(data.status).json(data);
  }

  @Delete('/location/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  async deleteLocationById(
    @Param('id') id,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.locationService.deleteLocationById(id, token);
    response.status(data.status).json(data);
  }

  // @Post('/location/upload-image-location')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: fileUploadLocationDto })
  // @ApiQuery({ name: 'id', required: true, type: Number })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @UseImageUploadInterceptor(`${process.env.RELATIVE_UPLOAD_PATH}/locations`)
  // async uploadImageLocation(
  //   @Query('id') id,
  //   @UploadedFile() file,
  //   @Res() response,
  // ): Promise<any> {
  //   const data = await this.locationService.uploadImageLocation(id, file);
  //   response.status(data.status).json(data);
  // }

  @Post('/location/upload-image-location')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: fileUploadLocationDto })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageLocation(
    @Query('id') id,
    @UploadedFile('file') file: Express.Multer.File,
    @Res() response,
  ): Promise<any> {
    try {
      const imageUrl = await this.cloudinaryService.uploadImage(
        file,
        'Airbnb-clone/locations',
      );
      const data = await this.locationService.uploadImageLocation(id, imageUrl);
      
      if (data.status === 404) {
        await this.cloudinaryService.deleteImage(imageUrl.public_id);
      }
      
      response.status(data.status).json(data);
    } catch (error) {
      response.status(500).json({
        status: 500,
        content: 'Internal Server Error',
        message: error,
      });
    }
  }
}
