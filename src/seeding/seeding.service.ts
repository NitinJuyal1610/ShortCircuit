import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedingService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async seedRanges(): Promise<void> {
    const ranges = [
      { start_value: 1000, end_value: 2000, current_value: 1000 },
      { start_value: 3000, end_value: 4000, current_value: 3000 },
    ];

    for (const range of ranges) {
      await this.ticketRepository.save(range);
    }
  }
}
