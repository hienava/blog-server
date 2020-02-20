
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AutomapperModule } from 'nestjsx-automapper';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';

@Module({
  imports: [AutomapperModule.forRoot(), SharedModule, MongooseModule.forRoot(ConfigurationService.connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  static host: string;
  static port: string;
  static isDev: boolean;

  constructor(private readonly configurationService: ConfigurationService) {

    AppModule.port = this.configurationService.get(Configuration.PORT);
    AppModule.host = this.configurationService.get(Configuration.HOST);
    AppModule.isDev = this.configurationService.isDevelopment;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }


}
