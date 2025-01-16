import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateSwagger } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateSwagger(app);
  await app.listen(3000);
}
bootstrap();
