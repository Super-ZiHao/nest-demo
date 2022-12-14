import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { TransformInterceptor } from './common/response';
// import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images')); // 静态资源访问（可以在网页上通过 http://localhost:3000/文件名 访问文件)
  app.enableCors({
    credentials: true,
  }); // 开启 cors 策略
  app.useGlobalPipes(new ValidationPipe()); // DTO验证
  app.useGlobalInterceptors(new TransformInterceptor()); // 响应拦截
  // app.useGlobalFilters(new HttpFilter()); // 异常拦截

  // swagger文档，提供给前端使用
  const options = new DocumentBuilder()
    .setTitle('接口')
    .setDescription('无')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
