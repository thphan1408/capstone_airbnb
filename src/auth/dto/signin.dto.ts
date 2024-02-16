import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty } from 'class-validator';

export default class signInDTO {
  @ApiProperty({ type: String, description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEmpty()
  pass_word: string;
}
