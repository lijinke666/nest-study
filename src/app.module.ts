import { LoggerMiddleware } from './middleware/logger';
import { Module, NestModule, MiddlewareConsumer, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { CatsController } from './cats/cats.controller';
import { ConfigModule } from './config/config.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Log4jsModule, Log4jsInterceptor } from 'nest-log4js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { GraphQLModule } from '@nestjs/graphql';

// 其实就是 angular 依赖注入
@Module({
  // 注入所有模块
  imports: [
    ConfigModule,
    // CatsModule,
    CacheModule.register(),
    Log4jsModule.forRoot({
      appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
      categories: { default: { appenders: ['cheese'], level: 'error' } },
    }),
    GraphQLModule.forRoot({
      include: [UsersModule],
      typePaths: ['./**/*.graphql'],
      debug: false,
      playground: true,
    }),
    // TypeOrmModule.forRoot(),      // 会去root 目录 涨到 ormconfig.json 读取配置
    // UsersModule,
  ],
  // 注入所有的 控制器
  controllers: [AppController],
  // 注入所有的 服务
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: 'LOG4JS_INTERCEPTOR',
      useClass: Log4jsInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 引用 中间键  只对于 Cats 控制器生效
    consumer
      .apply(LoggerMiddleware);
      // .forRoutes(CatsController);
  }
}
