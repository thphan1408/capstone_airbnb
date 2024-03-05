import { ApiProperty } from '@nestjs/swagger';

export class fileUploadRoomDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

// nhiều file
export class filesUploadRoomDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any;
}
