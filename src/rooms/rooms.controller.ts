import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/createRoom.dto';
import { AuthGuard } from '@nestjs/passport';

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
}
