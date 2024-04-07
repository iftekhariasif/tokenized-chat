import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS and restrict it to your React app's origin for added security
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(process.env.PORT || 4000); // Make sure to listen on port 4000 or another port different from React's
}
bootstrap();
