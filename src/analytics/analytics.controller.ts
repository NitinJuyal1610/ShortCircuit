import {
  Controller,
  Get,
  HttpRedirectResponse,
  Param,
  Redirect,
} from '@nestjs/common';
import { LinkService } from 'src/link/link.service';

@Controller()
export class AnalyticsController {
  constructor(private linkService: LinkService) {}

  @Get(':shortCode')
  @Redirect('/', 302)
  async getLink(
    @Param('shortCode') shortCode: string,
  ): Promise<HttpRedirectResponse> {
    // link redirect logic
    const link = await this.linkService.getLink(shortCode);
    return { url: link, statusCode: 302 };
  }
}
