import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY_METADATA } from '../contants/decorator.contants';
import { ApiException } from '../exceptions/api.exception';
import { RedisCacheService } from 'libs/cache';
import { generateUserPermissionKey } from 'libs/cache';
import { User } from 'libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ErrorEnum } from 'shared/contants/error-code.contants';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly redisServer: RedisCacheService,
    @InjectModel(User) private readonly userModel,
  ) {}
  async canActivate(context: ExecutionContext) {
    // 判断是否需要校验权限
    const permission = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY_METADATA,
      [context.getHandler(), context.getClass()],
    );
    if (!permission) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const userPermissionKey = generateUserPermissionKey(userId);
    let permissions = await this.redisServer.cacheGet(userPermissionKey);
    if (!permissions) {
      // 去数据库查询
      const user = await this.userModel.findById(userId).populate({
        path: 'roles',
        populate: {
          path: 'menus',
        },
      });

      const userPermissionArr = user.roles
        .map((role) => role.menus)
        .flat()
        .map((menu) => menu.permission);
      // await this.redisServer.cacheSet(userPermissionKey, userPermissionArr);
      permissions = userPermissionArr;
    }
    // 校验权限
    const result = permissions.includes(permission);
    if (!result) throw new ApiException(ErrorEnum.NO_PERMISSION);
    return result;
  }
}
