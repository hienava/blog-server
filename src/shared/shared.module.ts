import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { JwtStrategy } from './auth/strategies/jwt-strategy/jwt-strategy.service';
import { AuthService } from './auth/auth.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  providers: [ConfigurationService, AuthService, JwtStrategy],
  exports: [ConfigurationService,  AuthService],
  imports: [UserModule]
})
export class SharedModule {}
