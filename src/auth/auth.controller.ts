import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import signUpDTO from './dto/signup.dto';
import signInDTO from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: signUpDTO, required: true })
  async signUp(@Body() body: signUpDTO, @Res() response): Promise<any> {
    const data = await this.authService.signUp(body);
    response.status(data.status).json(data);
  }

  @Post('/signin')
  @ApiBody({ type: signInDTO, required: true })
  signIn(@Body() body: signInDTO): Promise<any> {
    return this.authService.signIn(body);
  }
}
