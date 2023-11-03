import { Module, forwardRef } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, RoleService],
  exports: [MenuService],
})
export class MenuModule {}
