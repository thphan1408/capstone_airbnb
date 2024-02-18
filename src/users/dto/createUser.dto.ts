import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsEmail({})
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
