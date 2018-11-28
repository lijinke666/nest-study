import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

// 这里有点像 angular 依赖注入
@Module({
  imports: [],
  // 注入所有的 控制器
  controllers: [AppController, CatsController],
  // 注入所有的 服务
  providers: [AppService, CatsService],
})
export class AppModule {}
