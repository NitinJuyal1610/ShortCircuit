import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProducerRecord } from 'kafkajs';
import { Model } from 'mongoose';
import { ConsumerService } from 'src/kafka/consumer.service';
import { ProducerService } from 'src/kafka/producer.service';
import { Analytics } from './analytics.schema';

@Injectable()
export class AnalyticsService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    @InjectModel('Analytics') private readonly analyticsModel: Model<Analytics>,
  ) {}

  async sendAnalytics(shortCode: string, req: Request) {
    const record: ProducerRecord = {
      topic: 'analytics',
      messages: [
        {
          value: JSON.stringify({ headers: req.headers, shortCode }),
        },
      ],
    };
    await this.producerService.produce(record);
  }

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['analytics'] },
      {
        eachMessage: async ({ message }) => {
          const data = JSON.parse(message.value.toString());
          const timestamp = new Date();
          const userAgent = data.headers['user-agent'];
          const browser = userAgent.split('/')[0];
          const isMobile = /Mobile/i.test(userAgent);
          const deviceType = isMobile ? 'Mobile' : 'Desktop';

          await this.analyticsModel.create({
            shortCode: data.shortCode,
            timestamp,
            browser,
            deviceType,
          });
        },
      },
    );
  }
}
