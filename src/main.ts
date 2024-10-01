import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const corsOriginList = configService
    .get<string>('CORS_ORIGIN_LIST')
    ?.split(',');

  console.log(corsOriginList, 'sda');

  if (corsOriginList[0] !== '*' && !validateCorsOriginList(corsOriginList)) {
    throw new Error('Invalid CORS_ORIGIN_LIST');
  }

  const corsOptions = {
    origin: corsOriginList, // Array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  };

  const config = new DocumentBuilder()
    .setTitle('Middleware  APIs')
    .setDescription('The Middlware service')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'Authorization', in: 'header' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger-docs', app, document);

  app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (corsOriginList.includes(origin) || corsOriginList[0] === '*') {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      throw new InternalServerErrorException('Invalid CORS_ORIGIN');
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    next();
  });

  app.enableCors(corsOptions);
  app.use(helmet());

  await app.listen(4000, () => {
    console.log(`Server middleware on port - 4000`);
  });
}

function validateCorsOriginList(corsOriginList: string[]): boolean {
  return corsOriginList.every((origin) => {
    return origin.includes('http://') || origin.includes('https://');
  });
}

bootstrap();
