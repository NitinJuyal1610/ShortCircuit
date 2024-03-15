import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { AuthModule } from 'src/auth/auth.module';
import { Link } from './link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), AuthModule, TicketModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
