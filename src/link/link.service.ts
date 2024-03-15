import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { User } from 'src/auth/user.entity';
import { CreateLinkDto } from './dto/create-link-dto';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
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
