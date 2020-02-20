import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Enable CORS
  app.enableCors();
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

  //Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Base API')
    .setDescription('Base api description')
    .setVersion('0.1')
    .addTag('Base')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(document);
  });

  SwaggerModule.setup('api/docs', app, null, {
    swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      ShowRequestDuration: true,
    },
  });
  //End Swagger configuration
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(AppModule.port);
}
bootstrap();
