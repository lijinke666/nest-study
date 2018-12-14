import { LoggerMiddleware } from './middleware/logger';
import { Module, NestModule, MiddlewareConsumer, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { ConfigModule } from './config/config.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

// 其实就是 angular 依赖注入
@Module({
  // 注入所有模块
  imports: [
    ConfigModule,
    CatsModule,
    CacheModule.register(),
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 引用 中间键
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
