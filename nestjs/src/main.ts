import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookies from 'cookie-parser';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: env.WEB_BASE_URL,
  });
  app.use(cookies());
  await app.listen(3000);
}
bootstrap();
