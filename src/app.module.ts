import {LoggerMiddleware} from './middleware/logger';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

// 这里有点像 angular 依赖注入
@Module({
  imports: [CatsModule],
  // 注入所有的 控制器
  controllers: [AppController],
  // 注入所有的 服务
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 引用 中间键
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
