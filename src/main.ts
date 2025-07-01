import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookiParse from "cookie-parser"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookiParse())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const echo=new DocumentBuilder().setTitle('Abbosbek.com').build()

  const document= SwaggerModule.createDocument(app,echo)
  SwaggerModule.setup('echo/swagger',app,document)
  await app.listen(process.env.PORT ?? 3000);
  console.log('\n http://localhost:3000/echo/swagger')
}
bootstrap();
