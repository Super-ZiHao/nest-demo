import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images')); // 静态资源访问（可以在网页上通过 http://localhost:3000/文件名 访问文件)
  app.enableCors({
    credentials: true,
  }); // 开启 cors 策略
  await app.listen(3000);
}
bootstrap();
