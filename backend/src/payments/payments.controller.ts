import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import type { AuthRequest } from 'src/interfaces/authRequest';
import { VerifyTokenGuard } from 'src/auth/verify-token/verify-token.guard';
import type { Request } from 'express';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @UseGuards(VerifyTokenGuard)
  createCheckout(@Body('orderId') orderId: string, @Req() req: AuthRequest) {
    return this.paymentsService.createPaymentIntent(orderId, req.user.sub);
  }

  @Post('webhook')
  async webhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('🔥 WEBHOOK HIT');

    const event = this.paymentsService.constructEvent(req.body, signature);

    console.log('🎯 EVENT TYPE:', event.type);

    await this.paymentsService.handlerWebHook(event);

    return { received: true };
  }

  @Get()
  @UseGuards(VerifyTokenGuard)
  findPaymets(@Req() req: AuthRequest) {
    return this.paymentsService.getPaymentsByUser(req.user.sub);
  }
}
