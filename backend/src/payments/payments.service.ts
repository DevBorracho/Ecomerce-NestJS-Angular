import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  stripe: Stripe;
  constructor(private Prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_KEY as string);
  }

  async createPaymentIntent(orderId: string, userId: string) {
    const order = await this.Prisma.order.findFirst({
      where: { id: orderId, userId, status: 'PENDING' },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Order: #${order.id}`,
            },
            unit_amount: Math.round(order.total * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.id,
        userId: order.userId,
      },
      success_url: 'http://localhost:4200/orders',
      cancel_url: 'http://localhost:4200/products',
    });
    return { url: session.url };
  }
  constructEvent(payload: Buffer, sig: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  }
  async handlerWebHook(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.onSuccess(event.data.object);
        break;

      case 'checkout.session.expired':
        await this.onCanceled(event.data.object);
        break;
    }
  }
  private async onSuccess(session: Stripe.Checkout.Session) {
    const orderId = session.metadata?.orderId;
    if (!orderId) return;

    await this.Prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          orderId,
          provider: 'STRIPE',
          status: 'SUCCESS',
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      });

      const items = await tx.orderItem.findMany({
        where: { orderId },
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }
    });
  }

  // 4️⃣ Pago cancelado
  private async onCanceled(session: Stripe.Checkout.Session) {
    const orderId = session.metadata?.orderId;
    if (!orderId) return;

    await this.Prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELED' },
    });
  }
  async getPaymentsByUser(userId: string) {
    return await this.Prisma.payment.findMany({
      where: {
        order: {
          userId,
        },
      },
      include: {
        order: { include: { items: { include: { product: true } } } },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
