import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dtos/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';

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
  async register(registerDto: RegisterDto) {
    const user = await this.Prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });
    if (user) throw new NotFoundException('User already exists');
    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.Prisma.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: passwordHash,
        phone: '',
        edad: 0,
        role: 'USER',
      },
    });
    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await this.JWT.signAsync(payload);
    return { user: user, token: token };
  }
}
