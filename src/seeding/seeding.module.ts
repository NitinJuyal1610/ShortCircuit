import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { SeedingService } from './seeding.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [SeedingService],
  exports: [SeedingService],
})
export class SeedingModule {}
