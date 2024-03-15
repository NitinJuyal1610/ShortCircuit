import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedingService } from './seeding/seeding.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seedingService = app.get(SeedingService);
  await seedingService.seedRanges();

  await app.listen(3000);
}
bootstrap();
