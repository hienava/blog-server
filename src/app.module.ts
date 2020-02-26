
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AutomapperModule } from 'nestjsx-automapper';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [AutomapperModule.forRoot(), SharedModule, MongooseModule.forRoot(ConfigurationService.connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), UserModule, BlogModule],
  providers: [AppService],
})

export class AppModule implements NestModule {
  static host: string;
  static port: string;
  static isDev: boolean;

  constructor(private readonly configurationService: ConfigurationService) {

    
    AppModule.isDev = this.configurationService.isDevelopment;
    AppModule.port = AppModule.isDev ? this.configurationService.get(Configuration.PORT) : this.configurationService.get(Configuration.PORT_PRO) ;
    AppModule.host = AppModule.isDev ? this.configurationService.get(Configuration.HOST) : this.configurationService.get(Configuration.HOST_PRO) ;
   
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
    console.log('puerto: ', AppModule.port);
    console.log('Dev: ', AppModule.isDev);
    console.log('env: ', process.env.NODE_ENV);
   
  }


}
