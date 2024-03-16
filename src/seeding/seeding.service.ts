import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from 'src/ticket/ticket.schema';

@Injectable()
export class SeedingService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async seedRanges(): Promise<void> {
    const ranges = [
      { start_value: 1000, end_value: 2000, current_value: 1000 },
      { start_value: 3000, end_value: 4000, current_value: 3000 },
    ];

    await this.ticketModel.insertMany(ranges);
  }
}
