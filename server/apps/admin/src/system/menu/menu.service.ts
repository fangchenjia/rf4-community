import { Injectable } from '@nestjs/common';
import { Menu } from 'libs/db/models/menu.model';
import { InjectModel } from 'nestjs-typegoose';
import { Role } from 'libs/db/models/role.model';
import { RoleService } from '../role/role.service';
import { CreateOrUpdateMenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu) private readonly menuModel,
    private readonly roleService: RoleService,
  ) {}

  /**
   * 根据角色获取所有菜单
   */
  async getMenusByRoles(roles: Role[]) {
    // 提取Role对象中的menus数组合并并且去重
    const menus = roles.map((role) => role.menus).flat();
    const menusNoRepeat = Array.from(new Set(menus));
    return await this.menuModel.find({
      _id: {
        $in: menusNoRepeat,
      },
    });
  }

  menusToTree(menus) {
    const buildMenuTree = (parentId: string | null) => {
      const tree: any[] = [];
      for (const menu of menus) {
        if (menu.parent?.toString() == parentId) {
          const children = buildMenuTree(menu._id.toString());
          children.sort((a, b) => a.meta.sort - b.meta.sort);
          const {
            _id,
            path,
            name,
            component,
            type,
            updatedAt,
            createdAt,
            ...meta
          } = menu._doc;
          const menuWithChildren = {
            meta: {
              title: menu.name,
              ...meta,
            },
            _id,
            path,
            name,
            component,
            type,
            updatedAt,
            createdAt,
            children: children.length > 0 ? children : null,
          };
          tree.push(menuWithChildren);
        }
      }
      return tree;
    };
    const menuTree = buildMenuTree(null);
    return menuTree;
  }

  async create(createMenuDto: CreateOrUpdateMenuDto) {
    return await this.menuModel.create(createMenuDto);
  }

  async findAll() {
    return await this.menuModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} menu`;
  }

  update(id: string, updateMenuDto: CreateOrUpdateMenuDto) {
    this.roleService.refreshOnlineUserPerms();
    return this.menuModel.updateOne({ _id: id }, updateMenuDto);
  }

  async remove(id: string) {
    // 删除角色表roles中的menus
    await this.roleService.updateMany(
      {
        menus: {
          $in: [id],
        },
      },
      {
        $pull: {
          menus: id,
        },
      },
    );
    return await this.menuModel.deleteOne({ _id: id });
  }
}
