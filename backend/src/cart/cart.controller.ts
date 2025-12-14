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
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import type { AuthRequest } from 'src/interfaces/authRequest';
import { VerifyTokenGuard } from 'src/auth/verify-token/verify-token.guard';

@Controller('cart')
@UseGuards(VerifyTokenGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ➕ Agregar producto al carrito
  @Post('items')
  addItem(
    @Body() createCartItemDto: CreateCartItemDto,
    @Req() req: AuthRequest,
  ) {
    return this.cartService.create(req.user.sub, createCartItemDto);
  }

  // 🛒 Obtener carrito del usuario
  @Get()
  getCart(@Req() req: AuthRequest) {
    return this.cartService.findOne(req.user.sub);
  }

  // ✏️ Actualizar cantidad de un item
  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  // ❌ Eliminar un item del carrito
  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

  // 🧹 Vaciar carrito completo
  @Delete()
  clearCart(@Req() req: AuthRequest) {
    return this.cartService.deleteCart(req.user.sub);
  }
}
