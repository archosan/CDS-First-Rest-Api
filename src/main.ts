import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppClusterService } from './app/app-cluster.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Rest API example with NestJS')
    .setDescription('This is a simple REST API example with NestJS.')
    .setVersion('1.0')
    .addBearerAuth(
      // Bearer token kimlik doğrulama şemasını ekler
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Sadece dekoratörlerle süslenmiş özelliklere izin ver
      forbidNonWhitelisted: true, // Tanımlanmamış özellikleri reddet
      transform: true, // İstekleri DTO sınıflarının örneklerine dönüştür
      disableErrorMessages: false, // Hata mesajlarını devre dışı bırak
    }),
  );

  await app.listen(3000);
}

//AppClusterService.clusterize(bootstrap);
bootstrap();
