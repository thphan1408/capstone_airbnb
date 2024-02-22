import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IResponse } from 'src/utils/response';
import CreateUserDto from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import UpdateUserDto from './dto/updateUser.dto';
import { initAvatar } from 'src/utils/initAvatar';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  // async getListUsers(): Promise<any> {
  //   try {
  //     const data = await this.prisma.nguoiDung.findMany({
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         phone: true,
  //         birth_day: true,
  //         gender: true,
  //         role: true,
  //         avatar: true,
  //       },
  //     });
  //     return {
  //       status: 200,
  //       content: 'Success',
  //       message: 'Get list users success',
  //       data: data,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       content: 'Internal Server Error',
  //       message: error,
  //     };
  //   }
  // }

  async createUser(body: CreateUserDto): Promise<any> {
    try {
      const { name, email, pass_word, phone, birth_day, gender, role } = body;

      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });

      if (checkUser) {
        return {
          status: 400,
          content: 'Bad Request',
          message: 'Email already exists',
        };
      } else {
        const newAvatar = initAvatar(name);
        const endcodePassword = bcrypt.hashSync(pass_word, 10);
        const newData = {
          name: name,
          email: email,
          pass_word: endcodePassword,
          phone: phone,
          birth_day: birth_day,
          gender: gender,
          role: role,
          avatar: newAvatar,
        };
        await this.prisma.nguoiDung.create({
          data: newData,
        });
        return {
          status: 201,
          content: 'Created successfully',
          message: 'Create user success',
        };
      }
    } catch (error) {
      return {
        status: 500,
        title: 'Internal server error',
        message: error,
      };
    }
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id: +id,
        },
      });

      if (!checkUser) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'User not found',
        };
      }
      // check user is admin
      if (checkUser.role !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'You cannot delete this user',
        };
      }
      await this.prisma.nguoiDung.delete({
        where: {
          id: id,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Delete user success',
      };
    } catch (error) {
      return {
        status: 500,
        title: 'Internal server error',
        message: error.message,
      };
    }
  }

  async getListUsers(
    page: string,
    size: string,
    keyword: string,
  ): Promise<any> {
    try {
      let numPage = Number(page);
      let numSize = Number(size);

      keyword === null || (keyword === undefined && (keyword = ''));
      numPage = isNaN(numPage) ? 1 : numPage;
      numSize = isNaN(numSize) ? 10 : numSize;

      const offset = (numPage - 1) * numSize;

      const data = await this.prisma.nguoiDung.findMany({
        skip: offset,
        take: numSize,
        where: {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              email: {
                contains: keyword,
              },
            },
            {
              phone: {
                contains: keyword,
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          birth_day: true,
          gender: true,
          role: true,
          avatar: true,
        },
      });
      return {
        status: 200,
        content: 'Success',
        message: 'Get list users success',
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

  async getUserById(id: string): Promise<any> {
    try {
      const data = await this.prisma.nguoiDung.findFirst({
        where: {
          id: +id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          birth_day: true,
          gender: true,
          role: true,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: `Users not found with id: ${id}`,
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: 'Get user success',
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

  async updateUser(id: string, body: UpdateUserDto): Promise<any> {
    try {
      const { name, email, pass_word, phone, birth_day, gender, role, avatar } =
        body;
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          id: +id,
        },
      });

      if (!user) {
        return {
          status: 404,
          content: 'Not Found',
          message: `Users not found with id: ${id}`,
        };
      }
      // const newAvatar = initAvatar(name);
      const endcodePassword = bcrypt.hashSync(pass_word, 10);
      const newData = {
        name: name,
        email: email,
        pass_word: endcodePassword,
        phone: phone,
        birth_day: birth_day,
        gender: gender,
        role: role,
        avatar: avatar,
      };
      await this.prisma.nguoiDung.update({
        where: {
          id: +id,
        },
        data: newData,
      });
      return {
        status: 200,
        content: 'Success',
        message: 'Update user success',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  // async uploadAvatar(file: any): Promise<any> {
  //   try {
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       content: 'Internal Server Error',
  //       message: error,
  //     };
  //   }
  // }
}
