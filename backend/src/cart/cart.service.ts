import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private Prisma: PrismaService) {}

  async create(userId: string, createCartItemDto: CreateCartItemDto) {
    // 1️⃣ Buscar carrito
    let cart = await this.Prisma.cart.findUnique({
      where: { userId },
    });

    // 2️⃣ Crear carrito si no existe
    if (!cart) {
      cart = await this.Prisma.cart.create({
        data: { userId },
      });
    }

    // 3️⃣ Buscar item existente
    const existingItem = await this.Prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: createCartItemDto.productId,
      },
    });

    // 4️⃣ Si existe → update
    if (existingItem) {
      return this.Prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + createCartItemDto.quantity,
        },
      });
    }

    // 5️⃣ Si no existe → create
    return this.Prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: createCartItemDto.productId,
        quantity: createCartItemDto.quantity,
      },
    });
  }

  async findOne(userId: string) {
    return await this.Prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cartItem = await this.Prisma.cartItem.findUnique({
      where: { id },
    });

    if (!cartItem) {
      throw new Error('Cart item no encontrado');
    }
    // Si la cantidad es 0 o menor → eliminar
    if ((updateCartDto.quantity as number) <= 0) {
      await this.Prisma.cartItem.delete({
        where: { id },
      });
      return { message: 'Item eliminado del carrito' };
    }

    // Actualizar cantidad
    return this.Prisma.cartItem.update({
      where: { id },
      data: {
        quantity: updateCartDto.quantity,
      },
    });
  }

  async remove(id: string) {
    const cartItem = await this.Prisma.cartItem.findUnique({
      where: { id },
    });

    if (!cartItem) {
      throw new Error('Cart item no encontrado');
    }

    await this.Prisma.cartItem.delete({
      where: { id },
    });

    return { message: 'Item eliminado del carrito' };
  }

  async deleteCart(userId: string) {
    const cart = await this.Prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return { message: 'Carrito ya está vacío' };
    }

    await this.Prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { message: 'Carrito vaciado correctamente' };
  }
}
