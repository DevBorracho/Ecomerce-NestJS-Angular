import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateOrderDto } from './dto/update.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart || cart.items.length === 0)
      throw new NotFoundException('el carrito esta vacio');
    let total = 0;
    for (const item of cart.items) {
      total += item.quantity * item.product.price;
    }
    const order = await this.prisma.order.create({
      data: { userId, total, status: 'PENDING' },
    });
    const orderItemsData = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));
    await this.prisma.orderItem.createMany({
      data: orderItemsData,
    });
    await this.prisma.cart.delete({ where: { id: cart.id } });
    return order;
  }

  findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      include: {
        items: { orderBy: { id: 'asc' }, include: { product: true } },
      },
    });
  }

  findOne(id: string, userId: string) {
    return this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: { include: { product: true } } },
    });
  }

  async update(id: string, userId: string, updateOrderDto: UpdateOrderDto) {
    // 1️⃣ Buscar la orden y verificar ownership
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!order) {
      throw new Error('Orden no encontrada o no pertenece al usuario');
    }

    // 2️⃣ Reglas de negocio
    if (order.status === 'PAID') {
      throw new Error('Una orden pagada no puede modificarse');
    }

    // 3️⃣ Actualizar status
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: updateOrderDto.status,
      },
    });

    return updatedOrder;
  }

  remove(id: string, userId: string) {
    return this.prisma.order.delete({ where: { id, userId } });
  }
}
