import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    // 连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // host
      port: 3306, // 端口
      username: 'root', // 账户
      password: '123456', // 密码
      database: 'dv', // 库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      synchronize: true, // 是否自动将实体类同步到数据库（生产环境别开！！！）
      retryAttempts: 10, // 重试连接数据库次数
      retryDelay: 500, // 重试连接数据库间隔
      autoLoadEntities: true, // 如果为 true，将自动加载实体 forFeature() 方法注册的每个实体都将自动添加到配置对象的实体
    }),
    CatsModule,
    AuthModule,
    UsersModule,
    UploadModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
