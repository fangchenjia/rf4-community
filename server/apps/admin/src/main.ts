import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  // swagger接口文档
  const options = new DocumentBuilder()
    .setTitle('俄钓4社区admin API')
    .setDescription('俄钓4社区后台管理界面的API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.ADMIN_PORT || 3000);
  console.log(`admin server run: http://localhost:${process.env.ADMIN_PORT}`);
}
bootstrap();
