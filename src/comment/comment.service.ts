import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  async getListComments(): Promise<any> {
    try {
      const data = await this.prisma.binhLuan.findMany();
      return {
        status: 200,
        content: 'Success',
        message: 'Get list comments successfully',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        data: error,
      };
    }
  }

  async createComment(body: CreateCommentDto): Promise<any> {
    try {
      const {
        noi_dung,
        ngay_binh_luan,
        sao_binh_luan,
        ma_nguoi_binh_luan,
        ma_phong,
      } = body;

      const checkRoom = await this.prisma.phong.findFirst({
        where: {
          id_phong: ma_phong,
        },
      });

      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id_nguoi_dung: ma_nguoi_binh_luan,
        },
      });

      if (!checkRoom || !checkUser) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'User or room not found',
        };
      }

      const newData = {
        noi_dung,
        ngay_binh_luan,
        sao_binh_luan,
        ma_nguoi_binh_luan,
        ma_phong,
      };

      await this.prisma.binhLuan.create({
        data: newData,
      });

      return {
        status: 201,
        content: 'Created',
        message: 'Create comment successfully',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async updateComment(id: string, body: UpdateCommentDto): Promise<any> {
    try {
      const {
        noi_dung,
        ngay_binh_luan,
        sao_binh_luan,
        ma_nguoi_binh_luan,
        ma_phong,
      } = body;

      const checkRoom = await this.prisma.phong.findFirst({
        where: {
          id_phong: ma_phong,
        },
      });

      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id_nguoi_dung: ma_nguoi_binh_luan,
        },
      });

      if (!checkRoom || !checkUser) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'User or room not found',
        };
      }

      const newData = {
        noi_dung: noi_dung,
        ngay_binh_luan: ngay_binh_luan,
        sao_binh_luan: sao_binh_luan,
        ma_nguoi_binh_luan: ma_nguoi_binh_luan,
        ma_phong: ma_phong,
      };

      await this.prisma.binhLuan.update({
        where: {
          id_binh_luan: +id,
        },
        data: newData,
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Update comment successfully',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async deleteComment(id: string): Promise<any> {
    try {
      const checkComment = await this.prisma.binhLuan.findFirst({
        where: {
          id_binh_luan: +id,
        },
      });

      if (!checkComment) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Comment not found',
        };
      }

      await this.prisma.binhLuan.delete({
        where: {
          id_binh_luan: +id,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Delete comment successfully',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async getCommentByIdRoom(maPhong: string): Promise<any> {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: {
          id_phong: +maPhong,
        },
      });

      if (!checkRoom) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Room not found',
        };
      }

      const data = await this.prisma.binhLuan.findMany({
        where: {
          ma_phong: +maPhong,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Get comment by id room successfully',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }
}
