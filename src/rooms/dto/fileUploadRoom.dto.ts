import { ApiProperty } from '@nestjs/swagger';

export class fileUploadRoomDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}


