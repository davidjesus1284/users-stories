import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './utils/configSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/users-stories');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/users-stories/docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
