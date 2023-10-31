import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerConfig } from './utility-modules/visibility/winston.config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  // createLogger of Winston

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(loggerConfig),
  });

  //setup swagger
  const options = new DocumentBuilder()
    .setTitle('App template API')
    .setDescription('Swagger of App template API')
    .setVersion('1.0')
    .addTag('campaigns')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
