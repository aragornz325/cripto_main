import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './interfaces/feedback.interface';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private readonly feedback: Model<Feedback>,
  ) {}

  async findAll(): Promise<Feedback[]> {
    return await this.feedback.find();
  }

  async create(body): Promise<Feedback> {
    return await this.feedback.create(body);
  }
}
