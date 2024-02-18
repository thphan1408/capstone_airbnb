import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDto from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @UseGuards(AuthGuard('jwt'))
  @Delete('/users/:id')
  async deleteUser(@Param('id') id: Number, @Res() response): Promise<any> {
    const data = await this.usersService.deleteUser(+id);
    response.status(data.status).json(data);
  }
}
