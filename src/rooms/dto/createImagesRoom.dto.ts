import { ApiProperty } from '@nestjs/swagger';

export class CreateImagesRoomDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
