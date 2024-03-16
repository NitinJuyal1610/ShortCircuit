import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserDocument } from 'src/auth/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateLinkDto } from './dto/create-link-dto';
import { LinkDocument } from './link.schema';

@Controller('links')
@UseGuards(AuthGuard())
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  getUserLinks(
    @GetUser() user: UserDocument,
    @Headers('host') host: string,
  ): Promise<LinkDocument[]> {
    return this.linkService.getUserLinks(user, host);
  }

  @Post()
  createLink(
    @GetUser() user: UserDocument,
    @Body() createLinkDto: CreateLinkDto,
  ): Promise<string> {
    return this.linkService.createLink(user, createLinkDto);
  }
}
