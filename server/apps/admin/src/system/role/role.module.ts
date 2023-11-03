import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MenuService } from '../menu/menu.service';
import { MenuModule } from '../menu/menu.module';

@Module({
  controllers: [RoleController],
  imports: [MenuModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
