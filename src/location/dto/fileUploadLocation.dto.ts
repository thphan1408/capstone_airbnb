import { ApiProperty } from '@nestjs/swagger';

export default class fileUploadLocationDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
