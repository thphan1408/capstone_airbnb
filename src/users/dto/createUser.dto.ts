import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { format, parseISO } from 'date-fns';
export default class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEmail({})
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  pass_word: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  birth_day: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;

  // constructor(partial: Partial<CreateUserDto>) {
  //   Object.assign(this, partial);
  //   this.formatDateOfBirthday();
  // }

  // private formatDateOfBirthday() {
  //   if (typeof this.birth_day === 'string') {
  //     this.birth_day = parseISO(this.birth_day);
  //   }
  // }
}
