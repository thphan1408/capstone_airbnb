import { Controller, Get, Res } from '@nestjs/common';
import { ReserveARoomService } from './reserve_a_room.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reserve a rooms')
@Controller('api')
export class ReserveARoomController {
  constructor(private readonly reserveARoomService: ReserveARoomService) {}

  @Get('/reserve-a-rooms')
  async getListReserveARooms(@Res() response): Promise<any> {
    const data = await this.reserveARoomService.getListReserveARooms();
    response.status(data.status).json(data);
  }
}
