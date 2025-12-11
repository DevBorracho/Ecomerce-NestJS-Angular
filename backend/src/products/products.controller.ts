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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { VerifyTokenGuard } from 'src/auth/verify-token/verify-token.guard';
import type { AuthRequest } from '../interfaces/authRequest';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(VerifyTokenGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: AuthRequest) {
    if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')
      return this.productsService.create(createProductDto);
    throw new UnauthorizedException('no tienes permiso para esta accion');
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: AuthRequest,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new UnauthorizedException('no tienes permiso para esta accion');
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    if (req.user.role !== 'ADMIN')
      throw new UnauthorizedException('no tienes permiso para esta accion');
    return this.productsService.remove(id);
  }
}
