import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { registerSwagger } from './swagger';
import { Log4jsService } from 'nest-log4js';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,      // 跨域  内置的 cors 模块
    logger: false,
  });
  // Cookie
  app.use(cookieParser());

  // Session
  app.use(
    session({
      secret: 'nest',
      name: 'nest',
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 设置 cookie 7天后过期
      resave: true,
      rolling: true,
      saveUninitialized: false,
    }),
  );

  // CSRF 跨站点请求伪造攻击
  // app.use(csurf());

  // 接口限速
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 最大 100个 ip
  }));

  // 全局验证
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  registerSwagger(app)();

  // logger
  app.useLogger(app.get(Log4jsService));

  await app.listen(3000);

  // 热更新
  acceptHotModule(app);
}

const acceptHotModule = (app) => {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};
bootstrap();
