import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const auth = await this.authService.login(data);
    res.cookie('token', auth.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    res.status(200).json({ user: auth.user, token: auth.token });
  }
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    res.status(200).json({ message: 'logout success' });
  }
}
