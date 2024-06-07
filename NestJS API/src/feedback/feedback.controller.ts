import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './interfaces/feedback.interface';
import { CreateFeedbackDto } from './dto/feedback.dto';

@Controller('api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  async findAll(): Promise<Feedback[]> {
    return this.feedbackService.findAll();
  }

  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.create(createFeedbackDto);
  }
}
