import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dtos/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService,
    private JWT: JwtService,
  ) {}
  async login(data: LoginDto) {
    const user = await this.Prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = await this.JWT.signAsync(payload);
    return { user: user, token: token };
  }
}
