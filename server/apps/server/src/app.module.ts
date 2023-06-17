import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from 'common/common';
import { AuthModule } from 'auth/auth';

@Module({
  imports: [CommonModule, AuthModule.forRoot('server')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
