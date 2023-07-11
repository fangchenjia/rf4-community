import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from 'libs/cache';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [JwtService, ConfigService, RedisCacheService],
})
export class UserModule {}
