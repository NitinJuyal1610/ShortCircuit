import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  createTicket(): number {
    return 1;
  }
}
