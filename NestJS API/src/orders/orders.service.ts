import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
const { client, testClient, Client, Config } = require('coingate-v2');
const coingate = testClient('7aKKKUsEPzGLKzZkzWjBypB8NTYsdqLHYHtGxw47'); // ASEGURAR!

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly orders: Model<Order>) {}

  async getAll(): Promise<any> {
    try {
      const orders = await coingate.listOrders();
      const myOrders = await this.orders.find({});
      return { orders, myOrders };
    } catch (err) {
      return { error: err };
    }
  }

  async getRates(): Promise<any> {
    try {
      return await coingate.listExchangeRates();
    } catch (err) {
      return err;
    }
  }

  async getById(id): Promise<Order> {
    try {
      const response = await this.orders.findById(id);
      return response;
    } catch (err) {
      return err;
    }
  }

  async getStatus(id): Promise<any> {
    try {
      const response = await coingate.getOrder(id);
      return { id, status: response.status };
    } catch (err) {
      return err;
    }
  }

  async update(id, body): Promise<any> {
    try {
      const check = await this.orders.findOne({ _id: id });
      if (!check.synced || !body.synced) {
        const newOrder = await this.orders.findOneAndUpdate({ _id: id }, body, {
          new: true,
        });
        return { newOrder, success: true };
      } else {
        return { success: false, error: 'Already synced!' };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async create(body): Promise<any> {
    const { price_amount, price_currency, receive_currency, userId, coins } =
      body;
    const response = await coingate
      .createOrder({
        price_amount,
        price_currency,
        receive_currency,
      })
      .catch((err) => {
        return err;
      });
    console.log(response);
    const order = await this.orders
      .create({
        paidAmount: response.price_amount,
        paidWith: response.price_currency,
        receivedWith: 'Pending...',
        receivedAmount: 'Pending...',
        coingateOrderId: response.id,
        coins,
        userId,
      })
      .catch((err) => {
        return err;
      });
    return { success: true, msg: response, dbInfo: order };
  }
}
