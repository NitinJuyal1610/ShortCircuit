import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Link } from './link.schema';
import { CreateLinkDto } from './dto/create-link-dto';

@Controller('links')
@UseGuards(AuthGuard())
export class LinkController {
  constructor(private linkService: LinkService) {}

  //   @Get()
  //   getUserLinks(@GetUser() user: User): Link[] {
  //     return this.linkService.getUserLinks(user);
  //   }

  @Post()
  createLink(
    @GetUser() user: User,
    @Body() createLinkDto: CreateLinkDto,
  ): Promise<string> {
    return this.linkService.createLink(user, createLinkDto);
  }
}
