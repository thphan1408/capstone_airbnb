import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoomDto } from './dto/createRoom.dto';

@Injectable()
export class RoomsService {
  prisma = new PrismaClient();
  async getListRooms(
    page: string | undefined,
    size: string | undefined,
    keyword: string,
  ): Promise<any> {
    try {
      let numPage: number | undefined = undefined;
      let numSize: number | undefined = undefined;

      if (page !== undefined) {
        numPage = Number(page);
        if (isNaN(numPage)) {
          throw new Error('Invalid value for page');
        }
      }

      if (size !== undefined) {
        numSize = Number(size);
        if (isNaN(numSize)) {
          throw new Error('Invalid value for size');
        }
      }

      keyword == null && (keyword = '');

      const offset =
        numPage !== undefined ? (numPage - 1) * numSize! : undefined;

      const data = await this.prisma.phong.findMany({
        skip: offset,
        take: numSize,
        where: {
          OR: [
            {
              ten_phong: {
                contains: keyword,
              },
            },
          ],
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Get list rooms success',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async createRoom(body: CreateRoomDto): Promise<any> {
    try {
      const {
        ten_phong,
        khach,
        phong_ngu,
        giuong,
        phong_tam,
        mo_ta,
        gia_tien,
        may_giat,
        ban_la,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        ban_ui,
        hinh_anh,
      } = body;

      const data = {
        ten_phong: ten_phong,
        khach: khach,
        phong_ngu: phong_ngu,
        giuong: giuong,
        phong_tam: phong_tam,
        mo_ta: mo_ta,
        gia_tien: gia_tien,
        may_giat: may_giat,
        ban_la: ban_la,
        tivi: tivi,
        dieu_hoa: dieu_hoa,
        wifi: wifi,
        bep: bep,
        do_xe: do_xe,
        ho_boi: ho_boi,
        ban_ui: ban_ui,
        hinh_anh: hinh_anh,
      };

      await this.prisma.phong.create({
        data: data,
      });

      return {
        status: 201,
        content: 'Created',
        message: 'Create room success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }
}
