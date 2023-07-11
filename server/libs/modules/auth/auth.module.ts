import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DbModule } from 'libs/db';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { RedisCacheModule, RedisCacheService } from 'libs/cache';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    DbModule,
    RedisCacheModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtService,
    AuthService,
    ConfigService,
    RedisCacheService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
