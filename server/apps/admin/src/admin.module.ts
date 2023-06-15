import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CommonModule } from 'common/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from 'auth/auth';

@Module({
  imports: [CommonModule, UsersModule, AuthModule.forRoot('admin')],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
