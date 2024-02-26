import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { verify } from 'jsonwebtoken';
import { FOLDERNAME } from 'src/constants';

@Injectable()
export class LocationService {
  prisma = new PrismaClient();

  async getListLocation(
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

      const data = await this.prisma.viTri.findMany({
        skip: offset,
        take: numSize,
        where: {
          OR: [
            {
              ten_vi_tri: {
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

  async createLocation(body: CreateLocationDto): Promise<any> {
    try {
      const { ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh } = body;
      const data = {
        ten_vi_tri: ten_vi_tri,
        tinh_thanh: tinh_thanh,
        quoc_gia: quoc_gia,
        hinh_anh: hinh_anh,
      };

      await this.prisma.viTri.create({
        data: data,
      });

      return {
        status: 201,
        content: 'Created',
        message: 'Create location success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async getLocationById(id: string): Promise<any> {
    try {
      const numId = Number(id);
      if (isNaN(numId)) {
        throw new Error('Invalid value for id');
      }

      const data = await this.prisma.viTri.findFirst({
        where: {
          id_vi_tri: numId,
        },
      });

      if (data === null) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Location not found',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: 'Get location success',
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

  async updateLocation(
    id: string,
    body: UpdateLocationDto,
    token: string,
  ): Promise<any> {
    try {
      const numId = Number(id);
      if (isNaN(numId)) {
        throw new Error('Invalid value for id');
      }

      const tokenDecode = verify(token, process.env.SECRET_KEY) as {
        role: string;
      };

      if (tokenDecode.role.toLowerCase() !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'You do not have permission to access this resource',
        };
      }

      const data = await this.prisma.viTri.findFirst({
        where: {
          id_vi_tri: numId,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Location not found',
        };
      }

      const { ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh } = body;

      const newData = {
        ten_vi_tri: ten_vi_tri,
        tinh_thanh: tinh_thanh,
        quoc_gia: quoc_gia,
        hinh_anh: hinh_anh,
      };

      await this.prisma.viTri.update({
        where: {
          id_vi_tri: numId,
        },
        data: newData,
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Update location success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async deleteLocationById(id: string, token: string): Promise<any> {
    try {
      const tokenDecode = verify(token, process.env.SECRET_KEY) as {
        role: string;
      };

      if (tokenDecode.role.toLowerCase() !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'You cannot delete this location',
        };
      }

      const numId = Number(id);
      if (isNaN(numId)) {
        throw new Error('Invalid value for id');
      }

      const data = await this.prisma.viTri.findFirst({
        where: {
          id_vi_tri: numId,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Location not found',
        };
      }

      await this.prisma.viTri.delete({
        where: {
          id_vi_tri: numId,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Delete location success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async uploadImageLocation(id: string, file: any): Promise<any> {
    try {
      const numId = Number(id);
      if (isNaN(numId)) {
        throw new Error('Invalid value for id');
      }

      const data = await this.prisma.viTri.findFirst({
        where: {
          id_vi_tri: numId,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Location not found',
        };
      }

      const relativePath = `${process.env.RELATIVE_UPLOAD_PATH}/${FOLDERNAME.LOCATION}`;

      const newData = {
        hinh_anh: `${relativePath}/${file.filename}`,
      };

      await this.prisma.viTri.update({
        where: {
          id_vi_tri: numId,
        },
        data: newData,
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Upload image location success',
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
