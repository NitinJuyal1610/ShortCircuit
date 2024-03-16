import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Link, LinkDocument } from './link.schema';
import { UserDocument } from 'src/auth/user.schema';
import { CreateLinkDto } from './dto/create-link-dto';
import { TicketService } from 'src/ticket/ticket.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { encodeMapping } from 'src/constants/encodeMapping';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name) private linkModel: Model<Link>,
    private ticketService: TicketService,
  ) {}

  async getLink(shortCode: string): Promise<string> {
    const link = await this.linkModel.findOne({ short_code: shortCode });
    if (!link) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    return link.url;
  }

  async getUserLinks(
    user: UserDocument,
    baseUrl: string,
  ): Promise<LinkDocument[]> {
    let result: LinkDocument[] = [];
    if (isValidObjectId(user._id)) {
      result = await this.linkModel.find(
        {
          user_id: user._id,
        },
        'url short_code',
      );
    }

    result = result.map((link) => {
      link.short_code = `${baseUrl}/${link.short_code}`;
      return link;
    });

    return result;
  }

  async createLink(
    user: UserDocument,
    createLinkDto: CreateLinkDto,
  ): Promise<string> {
    const { url } = createLinkDto;

    try {
      console.log('creating token');
      const value = await this.ticketService.createTicket();

      console.log(value);
      //encode the value
      const short_code = this.encode(value);
      console.log(short_code);
      await this.linkModel.create({ user_id: user._id, url, short_code });
      return short_code;
    } catch (error) {
      throw error;
    }
  }

  encode(decimal: number) {
    let short_url = '';
    while (decimal > 0) {
      const pair = decimal & 63;

      if (decimal) {
        short_url += encodeMapping[pair];
      }
      decimal >>= 6;
    }
    return short_url;
  }
}
