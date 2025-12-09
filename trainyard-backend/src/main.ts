import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Trainyard API')
    .setDescription('Trainyard API')
    .setVersion('1.0')
    .addTag('trainyard')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('reference', app, document);

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Global Interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global Prefix
  app.setGlobalPrefix('/api/v1');

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://trainyard.dawnsolutions.co',
      'http://trainyard.dawnsolutions.co',
    ],
  });

  await app.listen(process.env.PORT);
  Logger.log(
    `Server running on http://localhost:${process.env.PORT}`,
    'Bootstrap',
  );
}
bootstrap();
