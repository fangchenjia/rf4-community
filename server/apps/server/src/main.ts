import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiExceptionFilter } from 'shared/filters/api-exception.filter';
import { ApiTransformInterceptor } from 'shared/interceptors/api-transform.interceptor';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DtoValidationPipe } from 'shared/pipes/dto-validation.pipe';

// import {
//   DtoValidationPipe,
//   HttpReqTransformInterceptor,
//   HttpExceptionFilter,
// } from 'common/common';

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
  // 全局参数验证管道
  app.useGlobalPipes(new DtoValidationPipe());
  // 全局响应拦截器
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // 全局异常过滤器
  app.useGlobalFilters(
    new ApiExceptionFilter(app.get(WINSTON_MODULE_PROVIDER)),
  );
  await app.listen(process.env.SERVER_PORT || 3001);
  console.log(`server run: http://localhost:${process.env.SERVER_PORT}`);
}
bootstrap();
