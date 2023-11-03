import { NestFactory, Reflector } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DtoValidationPipe } from 'shared/pipes/dto-validation.pipe';
import { ApiTransformInterceptor } from 'shared/interceptors/api-transform.interceptor';
import { ApiExceptionFilter } from 'shared/filters/api-exception.filter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.setGlobalPrefix('v1');
  // swagger接口文档
  const options = new DocumentBuilder()
    .setTitle('俄钓4社区admin API')
    .setDescription('俄钓4社区后台管理界面的API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  // 全局参数验证管道
  app.useGlobalPipes(new DtoValidationPipe());
  // 全局响应拦截器
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // 全局异常过滤器
  app.useGlobalFilters(
    new ApiExceptionFilter(app.get(WINSTON_MODULE_PROVIDER)),
  );
  await app.listen(process.env.ADMIN_PORT || 3000);
  console.log(
    `admin server run: http://${process.env.ADMIN_HOST}:${process.env.ADMIN_PORT}`,
  );
}
bootstrap();
