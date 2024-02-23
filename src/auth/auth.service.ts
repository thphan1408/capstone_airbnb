import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import signUpDTO from './dto/signup.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import signInDTO from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { initAvatar } from 'src/utils/initAvatar';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(body: signUpDTO): Promise<any> {
    try {
      const { email, pass_word, name, phone, gender, role, birth_day } = body;

      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        return {
          status: 400,
          title: 'Bad Request',
          message: 'Email already exists',
        };
      } else {
        const newAvatar = initAvatar(name);
        const endcodePassword = bcrypt.hashSync(pass_word, 10);
        const newUser = {
          name,
          email,
          pass_word: endcodePassword,
          phone,
          birth_day,
          gender,
          role: 'User',
          avatar: newAvatar,
        };

        await this.prisma.nguoiDung.create({
          data: newUser,
        });
        return {
          status: 201,
          title: 'Success',
          message: 'Sign up success',
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

  async signIn(body: signInDTO): Promise<any> {
    try {
      const { email, pass_word } = body;

      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        const checkPassword = bcrypt.compareSync(pass_word, user.pass_word);

        if (checkPassword) {
          const payload = {
            id: user.id_nguoi_dung,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            birth_day: user.birth_day,
            gender: user.gender,
            avatar: user.avatar,
          };

          const token = this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRE_IN'),
          });
          return {
            status: 200,
            title: 'Success',
            message: 'Sign in success',
            token: token,
            data: {
              content: payload,
            },
          };
        }
        return {
          status: 400,
          title: 'Bad Request',
          message: 'Password is not correct',
        };
      } else {
        return {
          status: 404,
          title: 'Not Found',
          message: 'User not found',
        };
      }
    } catch (error) {
      return {
        status: 500,
        title: 'Internal server error',
        message: error.message,
      };
    }
  }
}
