import { ApiProperty } from '@nestjs/swagger';

export default class signUpDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  pass_word: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birth_day: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;
}
