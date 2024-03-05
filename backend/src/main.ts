import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication, LogLevel, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  app.use(new LoggingMiddleware().use);
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  setupLogLevel(app);
  setupSwagger(app);

  await app.listen(3000);
}

function setupSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Factory Experience Backend')
    .setDescription('The factory experience backend API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

function setupLogLevel(app: INestApplication<any>) {
  const configService = app.get(ConfigService);
  const logLevels = configService.get('LOG_LEVELS')?.split(/\s*,\s*/);

  if (logLevels) {
    app.useLogger(logLevels as LogLevel[]);
  }
}

bootstrap();
