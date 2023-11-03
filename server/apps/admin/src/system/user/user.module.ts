import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MenuModule } from '../menu/menu.module';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { MenuService } from '../menu/menu.service';

@Module({
  controllers: [UserController],
  providers: [UserService, RoleService, MenuService],
  exports: [UserService],
})
export class UserModule {}
