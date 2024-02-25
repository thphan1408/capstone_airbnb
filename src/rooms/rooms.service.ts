import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoomDto } from './dto/createRoom.dto';
import { verify } from 'jsonwebtoken';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import fileUploadRoomDto from './dto/fileUploadRoom.dto';

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
        gia_tien,
        mo_ta,
        may_giat,
        ban_ui,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        hinh_anh,
        ma_vi_tri,
      } = body;

      const data = {
        ten_phong: ten_phong,
        khach: khach,
        phong_ngu: phong_ngu,
        giuong: giuong,
        phong_tam: phong_tam,
        gia_tien: gia_tien,
        mo_ta: mo_ta,
        may_giat: may_giat,
        ban_ui: ban_ui,
        tivi: tivi,
        dieu_hoa: dieu_hoa,
        wifi: wifi,
        bep: bep,
        do_xe: do_xe,
        ho_boi: ho_boi,
        hinh_anh: hinh_anh,
        ma_vi_tri: ma_vi_tri,
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

  async getRoomByLocation(ma_vi_tri: string): Promise<any> {
    try {
      const data = await this.prisma.phong.findMany({
        where: {
          ma_vi_tri: +ma_vi_tri,
        },
      });

      if (data.length === 0) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Location id not found',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: 'Get room by location success',
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

  async getRoomById(id: string): Promise<any> {
    try {
      const data = await this.prisma.phong.findUnique({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Room not found',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: 'Get room by id success',
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

  async deleteRoomById(token: string, id: string): Promise<any> {
    try {
      const tokenDecode = verify(token, process.env.SECRET_KEY) as {
        role: string;
      };

      if (tokenDecode.role.toLowerCase() !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'You cannot delete this room',
        };
      }

      const data = await this.prisma.phong.findFirst({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Room not found',
        };
      }

      await this.prisma.phong.delete({
        where: {
          id_phong: +id,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Delete room success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async updateRoom(
    token: string,
    id: string,
    body: UpdateRoomDto,
  ): Promise<any> {
    try {
      const tokenDecode = verify(token, process.env.SECRET_KEY) as {
        role: string;
      };

      if (tokenDecode.role.toLowerCase() !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'You cannot update this room',
        };
      }

      const {
        ten_phong,
        khach,
        phong_ngu,
        giuong,
        phong_tam,
        gia_tien,
        mo_ta,
        may_giat,
        ban_ui,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        hinh_anh,
        ma_vi_tri,
      } = body;

      const data = await this.prisma.phong.findFirst({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Room not found',
        };
      }

      const dataUpdate = {
        ten_phong,
        khach,
        phong_ngu,
        giuong,
        phong_tam,
        gia_tien,
        mo_ta,
        may_giat,
        ban_ui,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        hinh_anh,
        ma_vi_tri,
      };

      await this.prisma.phong.update({
        where: {
          id_phong: +id,
        },
        data: dataUpdate,
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Update room success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async uploadImageRoom(id: string, file: any): Promise<any> {
    try {
      const data = await this.prisma.phong.findFirst({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Room not found',
        };
      }

      await this.prisma.phong.update({
        where: {
          id_phong: +id,
        },
        data: {
          hinh_anh: file.filename,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Upload image room success',
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
