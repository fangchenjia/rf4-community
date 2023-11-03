import { Injectable } from '@nestjs/common';
import { User } from 'libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { MenuService } from '../menu/menu.service';
import { RoleService } from '../role/role.service';
import { Menu } from 'libs/db/models/menu.model';
import { FindUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel,
    private readonly roleService: RoleService,
    private menuService: MenuService,
  ) {}
  async init() {
    const user = await this.userModel.findOne({
      mobile: '18711003418',
    });
    // 创建菜单
    const sysMenu = await this.menuService.create({
      path: '/system',
      name: 'System',
      component: 'LAYOUT',
      type: 0,
      icon: 'ion:settings-outline',
      permission: 'system',
      parent: null,
      sort: 0,
      hidden: false,
      keepAlive: false,
      externalLink: false,
      disabled: false,
    });
    const accountMenu = await this.menuService.create({
      path: '/system/account',
      name: 'AccountManagement',
      component: '/system/account/index',
      type: 1,
      icon: 'ion:settings-outline',
      permission: 'system:account',
      parent: sysMenu._id,
      sort: 0,
      hidden: false,
      keepAlive: false,
      externalLink: false,
      disabled: false,
    });
    const roleMenu = await this.menuService.create({
      path: '/system/role',
      name: 'RoleManagement',
      component: '/system/role/index',
      type: 1,
      icon: 'ion:settings-outline',
      permission: 'system:role',
      parent: sysMenu._id,
      sort: 0,
      hidden: false,
      keepAlive: false,
      externalLink: false,
      disabled: false,
    });
    const menu = await this.menuService.create({
      path: '/system/menu',
      name: 'MenuManagement',
      component: '/system/menu/index',
      type: 1,
      icon: 'ion:settings-outline',
      permission: 'system:menu',
      parent: sysMenu._id,
      sort: 0,
      hidden: false,
      keepAlive: false,
      externalLink: false,
      disabled: false,
    });
    // 创建角色
    const role = await this.roleService.create({
      name: '管理员',
      description: '管理员',
      value: 'admin',
      menus: [sysMenu._id, accountMenu._id, roleMenu._id, menu._id],
    });
    user.roles = [role._id];
    await user.save();
  }

  // 获取权限菜单
  async getMenus(userId: string) {
    const user = await this.userModel.findById(userId).populate('roles');
    const roles = user.roles;
    const menus = await this.menuService.getMenusByRoles(roles);
    return menus;
  }

  // 获取权限列表
  async getPerms(userId: string) {
    const menus = await this.getMenus(userId);
    return menus.map((menu) => menu.permission);
  }

  // 获取树状菜单列表
  async getTreeMenus(userId: string) {
    const menus = await this.getMenus(userId);
    return this.menuService.menusToTree(menus);
  }

  create() {
    return 'This action adds a new user';
  }

  async findAll(pageParam: FindUserDto) {
    const { pageSize = 10, pageNum = 1 } = pageParam;
    const userParam = {
      mobile: {
        $regex: pageParam.mobile || '',
      },
      nickname: {
        $regex: pageParam.nickname || '',
      },
    };
    const userList = await this.userModel
      .find(userParam)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    // .populate({ path: 'roles', select: ['_id', 'name', 'description'] });
    const total = await this.userModel.count(userParam);
    return {
      list: userList,
      total,
      pageNum: pageParam.pageNum,
      pageSize: pageParam.pageSize,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async updateMany(match, param) {
    await this.userModel.updateMany(match, param);
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
}
