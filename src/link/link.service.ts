import { Injectable } from '@nestjs/common';
import { Link } from './link.schema';
import { User } from 'src/auth/user.schema';
import { CreateLinkDto } from './dto/create-link-dto';

import { TicketService } from 'src/ticket/ticket.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name) private linkModel: Model<Link>,
    private ticketService: TicketService,
  ) {}

  //   async getUserLinks(user: User): Link[] {
  //     return [];
  //   }

  async createLink(user: User, createLinkDto: CreateLinkDto): Promise<string> {
    const { url } = createLinkDto;

    const value = this.ticketService.createTicket();
    return url + value.toString();
  }
}
