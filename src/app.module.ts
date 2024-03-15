import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LinkModule } from './link/link.module';
import { TicketModule } from './ticket/ticket.module';
import { SeedingModule } from './seeding/seeding.module';
import { SeedingService } from './seeding/seeding.service';
import { Ticket } from './ticket/ticket.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TicketModule,
    LinkModule,
    SeedingModule,
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedingService],
})
export class AppModule {}
