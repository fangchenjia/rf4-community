import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  // swagger接口文档
  const options = new DocumentBuilder()
    .setTitle('俄钓4社区server API')
    .setDescription('俄钓4社区WEB端API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.SERVER_PORT || 3001);
  console.log(`server run: http://localhost:${process.env.SERVER_PORT}`);
}
bootstrap();
