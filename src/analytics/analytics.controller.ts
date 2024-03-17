import {
  Controller,
  Get,
  HttpRedirectResponse,
  Inject,
  Param,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from 'src/link/link.service';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '@nestjs/passport';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Controller()
export class AnalyticsController {
  constructor(
    private linkService: LinkService,
    private analyticsService: AnalyticsService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}

  @Get(':shortCode')
  @Redirect('/', 302)
  async getLink(
    @Param('shortCode') shortCode: string,
    @Req() req: Request,
  ): Promise<HttpRedirectResponse> {
    // kafka
    await this.analyticsService.sendAnalytics(shortCode, req);

    //redirect
    const cached: string = await this.cacheManager.get(shortCode);
    console.log(cached);
    if (cached) {
      return { url: cached, statusCode: 302 };
    }
    const link = await this.linkService.getLink(shortCode);
    await this.cacheManager.set(shortCode, link, { ttl: 3600 });
    return { url: link, statusCode: 302 };
  }

  @UseGuards(AuthGuard())
  @Get(':shortCode/analytics')
  async getAnalytics(@Param('shortCode') shortCode: string) {
    //redirect
    const cached: string = await this.cacheManager.get(
      `${shortCode}-analytics`,
    );

    if (cached) {
      return cached;
    }

    const analytics = await this.analyticsService.getAnalytics(shortCode);
    await this.cacheManager.set(`${shortCode}-analytics`, analytics, {
      ttl: 60,
    });

    return analytics;
  }
}
