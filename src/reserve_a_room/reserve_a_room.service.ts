import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReserveARoomService {
  prisma = new PrismaClient();

  async getListReserveARooms(): Promise<any> {
    try {
      const data = await this.prisma.datPhong.findMany();
      return {
        status: 200,
        content: 'Success',
        message: 'Get list reserve a room success',
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
