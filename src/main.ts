import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { registerSwagger } from './swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  registerSwagger(app)();
  await app.listen(3000);
  acceptHotModule(app);
}

const acceptHotModule = (app) => {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};
bootstrap();
