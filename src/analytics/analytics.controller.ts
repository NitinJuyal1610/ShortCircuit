import {
  Controller,
  Get,
  HttpRedirectResponse,
  Param,
  Redirect,
  Req,
} from '@nestjs/common';
import { LinkService } from 'src/link/link.service';
import { AnalyticsService } from './analytics.service';

@Controller()
export class AnalyticsController {
  constructor(
    private linkService: LinkService,
    private analyticsService: AnalyticsService,
  ) {}

  @Get(':shortCode')
  @Redirect('/', 302)
  async getLink(
    @Param('shortCode') shortCode: string,
    @Req() req: Request,
  ): Promise<HttpRedirectResponse> {
    //redirect
    const link = await this.linkService.getLink(shortCode);
    // kafka
    await this.analyticsService.sendAnalytics(shortCode, req);
    return { url: link, statusCode: 302 };
  }
}
