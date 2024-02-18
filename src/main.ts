import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // define swagger document
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Final Project')
    .setDescription('The Final Project API for airbnb')
    .setVersion('1.0')
    .build();

  const swagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, swagger);

  await app.listen(5000);
}
bootstrap();
