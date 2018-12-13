import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DatabaseModule } from '../database/database.module';
import { catsProviders } from './cats.providers';

// 将 多个 controller 和 service 组合  变成一个模块
@Module({
  imports: [DatabaseModule],
  // 注入所有的 控制器
  controllers: [CatsController],
  // 注入所有的 服务
  providers: [
    CatsService,
    ...catsProviders,
  ],
})
export class CatsModule {}
