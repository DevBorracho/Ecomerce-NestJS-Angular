import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyTokenGuard } from 'src/verify-token/verify-token.guard';
import type { AuthRequest } from 'src/interfaces/authRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(VerifyTokenGuard)
  findAll(@Req() req: AuthRequest) {
    if (req.user.role !== 'ADMIN')
      throw new UnauthorizedException('no tienes permiso para esta accion');
    return this.usersService.findAll();
  }

  @Get('/profile')
  @UseGuards(VerifyTokenGuard)
  profile(@Req() req: AuthRequest) {
    const id = req.user.sub;
    return this.usersService.findOne(id);
  }
  @Get(':id')
  @UseGuards(VerifyTokenGuard)
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    const user = req.user;
    if (id && user.role === 'ADMIN') return this.usersService.findOne(id);
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }

  @Patch('/update')
  @UseGuards(VerifyTokenGuard)
  updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req: AuthRequest) {
    return this.usersService.update(req.user.sub, updateUserDto);
  }
  @Patch(':id')
  @UseGuards(VerifyTokenGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthRequest,
  ) {
    if (id && req.user.role === 'ADMIN')
      return this.usersService.update(id, updateUserDto);
    throw new UnauthorizedException(
      'no tienes permiso para realizar esta accion',
    );
  }

  @Delete('/delete')
  @UseGuards(VerifyTokenGuard)
  async removeMe(@Req() req: AuthRequest) {
    const user = await this.usersService.remove(req.user.sub);

    if (user) return { message: 'usuario eliminado correctamente' };
  }
  @Delete(':id')
  @UseGuards(VerifyTokenGuard)
  async remove(@Param('id') id: string, @Req() req: AuthRequest) {
    if (id && req.user.role === 'ADMIN') {
      const user = await this.usersService.remove(id);

      if (user) return { message: 'usuario eliminado correctamente' };
    }
    throw new UnauthorizedException(
      'no tienes permiso para realizar esta accion',
    );
  }
}
