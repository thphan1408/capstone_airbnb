import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
  @ApiProperty()
  noi_dung: string;
  @ApiProperty()
  ngay_binh_luan: string;
  @ApiProperty()
  sao_binh_luan: number;
  @ApiProperty()
  ma_nguoi_binh_luan: number;
  @ApiProperty()
  ma_phong: number;
}
