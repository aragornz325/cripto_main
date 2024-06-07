import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';

@Controller('api/order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll(): Promise<Order[]> {
    return await this.ordersService.getAll();
  }

  @Get('rates')
  async getRates(): Promise<any> {
    return await this.ordersService.getRates();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.getById(id);
  }

  @Get('status/:id')
  async getStatus(@Param('id') id: string): Promise<any> {
    return await this.ordersService.getStatus(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: object): Promise<any> {
    return await this.ordersService.update(id, body);
  }

  @Post()
  async create(@Body() body): Promise<any> {
    return await this.ordersService.create(body);
  }
}
