import { ApiProperty } from '@nestjs/swagger';

export default class fileUploadRoomDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
