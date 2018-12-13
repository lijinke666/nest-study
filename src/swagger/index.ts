import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const registerSwagger = (app) => (route = '/docs') => {
  const options = new DocumentBuilder()
    .setTitle('nest 后端学习')
    .setDescription('API 文档')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(route, app, document);
};