import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private Prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.Prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: passwordHash,
        phone: createUserDto.phone,
        edad: createUserDto.edad,
        role: createUserDto.role,
      },
    });
    if (!user) throw new BadRequestException();
    return user;
  }

  async findAll() {
    const users = await this.Prisma.user.findMany({
      orderBy: {
        username: 'asc',
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.Prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.Prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.Prisma.user.delete({
      where: { id },
    });
    if (!user) throw new BadRequestException();
    return user;
  }
}
