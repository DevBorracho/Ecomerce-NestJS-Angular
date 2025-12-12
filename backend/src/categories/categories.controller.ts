import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import type { AuthRequest } from 'src/interfaces/authRequest';
import { VerifyTokenGuard } from 'src/auth/verify-token/verify-token.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(VerifyTokenGuard)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: AuthRequest,
  ) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')
      return this.categoriesService.create(createCategoryDto);
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }

  @Get()
  @UseGuards(VerifyTokenGuard)
  findAll(@Req() req: AuthRequest) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')
      return this.categoriesService.findAll();
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }

  @Get(':id')
  @UseGuards(VerifyTokenGuard)
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')
      return this.categoriesService.findOne(id);
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }

  @Patch(':id')
  @UseGuards(VerifyTokenGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: AuthRequest,
  ) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')
      return this.categoriesService.update(id, updateCategoryDto);
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }

  @Delete(':id')
  @UseGuards(VerifyTokenGuard)
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')
      return this.categoriesService.remove(id);
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }
}
