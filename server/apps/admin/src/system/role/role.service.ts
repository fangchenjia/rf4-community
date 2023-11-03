import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Role } from 'libs/db/models/role.model';
import { CreateOrUpdateRoleDto } from './role.dto';
import { User } from 'libs/db/models/user.model';
import { MenuService } from '../menu/menu.service';
import { RedisCacheService, generateUserPermissionKey } from 'libs/cache';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleModel,
    @InjectModel(User) private readonly userMosel,
    private readonly redisServer: RedisCacheService,
  ) {}
  create(createRoleDto: CreateOrUpdateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return await this.roleModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  async update(id: string, updateRoleDto: CreateOrUpdateRoleDto) {
    // 清除所有用户权限缓存
    await this.roleModel.findByIdAndUpdate(id, updateRoleDto);
    await this.refreshOnlineUserPerms();
  }

  async updateMany(match, param) {
    await this.roleModel.updateMany(match, param);
    await this.refreshOnlineUserPerms();
  }

  async remove(id: string) {
    // 删除用户表users中的roles字段中的id
    await this.userMosel.updateMany(
      {
        roles: {
          $in: [id],
        },
      },
      {
        $pull: {
          roles: id,
        },
      },
    );
    await this.roleModel.findByIdAndDelete(id);
    await this.refreshOnlineUserPerms();
  }

  async refreshOnlineUserPerms() {
    // 清除所有用户权限缓存
    await this.redisServer.cacheClearKey(generateUserPermissionKey(''));
  }
}
