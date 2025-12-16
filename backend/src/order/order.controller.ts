import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import type { AuthRequest } from 'src/interfaces/authRequest';
import { VerifyTokenGuard } from 'src/auth/verify-token/verify-token.guard';
import { UpdateOrderDto } from './dto/update.dto';

@Controller('order')
@UseGuards(VerifyTokenGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req: AuthRequest) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException();
    return this.orderService.create(userId);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException();
    return this.orderService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException();
    return this.orderService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException();
    return this.orderService.update(id, userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException();
    return this.orderService.remove(id, userId);
  }
}
