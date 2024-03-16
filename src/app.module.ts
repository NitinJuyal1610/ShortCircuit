import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LinkModule } from './link/link.module';
import { TicketModule } from './ticket/ticket.module';
import { SeedingModule } from './seeding/seeding.module';
import { SeedingService } from './seeding/seeding.service';
import { Ticket } from './ticket/ticket.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TicketModule,
    LinkModule,
    SeedingModule,
    MongooseModule.forFeature([{ name: 'Ticket', schema: Ticket }]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedingService],
})
export class AppModule {}
