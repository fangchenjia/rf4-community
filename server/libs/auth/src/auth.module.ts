import { DynamicModule, Global, Module } from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({})
export class AuthModule {
  static forRoot(AuthType: string): DynamicModule {
    const controllers = [];
    if (AuthType === 'admin') {
      controllers.push(AdminAuthController);
    }
    return {
      module: AuthModule,
      imports: [PassportModule],
      controllers,
      providers: [LocalStrategy, JwtStrategy],
    };
  }
}
