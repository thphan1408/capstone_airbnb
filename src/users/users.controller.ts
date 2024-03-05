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
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDto from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import UpdateUserDto from './dto/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import FileUploadDto from './dto/fileUpload.dto';

@ApiTags('Users')
@Controller('api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // @Get('/users')
  // async getListUsers(@Res() response): Promise<any> {
  //   const data = await this.usersService.getListUsers();
  //   response.status(data.status).json(data);
  // }

  // getListUsers
  @Get('/users')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'size', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  async getListUsers(
    @Query('page') page,
    @Query('size') size,
    @Query('keyword') keyword,
    @Res() response,
  ): Promise<any> {
    const data = await this.usersService.getListUsers(page, size, keyword);
    response.status(data.status).json(data);
  }

  // getUserById
  @ApiParam({ name: 'id', type: Number })
  @Get('users/:id')
  async getUserById(@Param('id') id, @Res() response): Promise<any> {
    const data = await this.usersService.getUserById(id);
    response.status(data.status).json(data);
  }

  // createUser
  @Post('/users')
  async createUser(@Body() body: CreateUserDto, @Res() response): Promise<any> {
    const data = await this.usersService.createUser(body);
    response.status(data.status).json(data);
  }

  // deleteUser
  @ApiParam({ name: 'id', type: Number })
  // @ApiHeader({ name: 'Authorization', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // middleware authentication
  @Delete('/users/:id')
  async deleteUser(
    @Param('id') id: Number,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.usersService.deleteUser(token, +id);
    response.status(data.status).json(data);
  }

  // updateUser
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('users/:id')
  async updateUsers(
    @Param('id') id,
    @Body() body: UpdateUserDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.usersService.updateUser(id, body);
    response.status(data.status).json(data);
  }

  @Post('/users/upload-avatar')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile('file') file: Express.Multer.File,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    try {
      const imageUrl = await this.cloudinaryService.uploadImage(
        file,
        'Airbnb-clone/avatar',
      );
      const token = request.headers.authorization.split(' ')[1];
      const data = await this.usersService.uploadAvatar(imageUrl, token);
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
