import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT || 3001);
  console.log(`server run: http://localhost:${process.env.SERVER_PORT}`);
}
bootstrap();
