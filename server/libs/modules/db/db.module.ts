import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';

import { User } from './models/user.model';
import { Role } from './models/role.model';
import { Menu } from './models/menu.model';
import { Position } from './models/position.model';
import { Map } from './models/map.model';
import { Fish } from './models/fish.model';
import { Bait } from './models/bait.model';
import { Dict } from './models/dict.model';
import { Image } from './models/image.model';
import { PositionComment } from './models/comment.model';
const models = TypegooseModule.forFeature([
  User,
  Role,
  Menu,
  Position,
  Map,
  Fish,
  Bait,
  Dict,
  Image,
  PositionComment,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const DB_USER = configService.get('DB_USER');
        const DB_USER_PWD = configService.get('DB_USER_PWD');
        const DB_HOST = configService.get('DB_HOST');
        const DB_PORT = configService.get('DB_PORT');
        const DB_NAME = configService.get('DB_NAME');
        const DB_URL = `mongodb://${DB_USER}:${DB_USER_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        return {
          uri: DB_URL,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
