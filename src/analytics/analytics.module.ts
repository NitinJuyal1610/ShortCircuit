import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from 'src/link/link.schema';
import { TicketModule } from 'src/ticket/ticket.module';
import { LinkModule } from 'src/link/link.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { AnalyticsSchema } from './analytics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Link', schema: LinkSchema },
      { name: 'Analytics', schema: AnalyticsSchema },
    ]),
    TicketModule,
    LinkModule,
    KafkaModule,
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
