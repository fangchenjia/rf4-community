import { Global, Module } from '@nestjs/common';
import {
  WinstonLogger,
  WinstonModule,
  WinstonModuleOptions,
  utilities,
} from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { Console } from 'winston/lib/winston/transports';
import { LogService } from './log.service';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

function createDailyRotateTrasnport(config: {
  level: string;
  filename: string;
  dirname: string;
}) {
  return new DailyRotateFile({
    level: config.level,
    dirname: config.dirname,
    filename: `${config.filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new Console({
          level: configService.get('LOG_LEVEL') || 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
            winston.format.prettyPrint(),
            winston.format.errors({ stack: true }),
          ),
        });

        return {
          transports: [
            consoleTransports,
            // 是否开启日志文件
            ...(configService.get('LOG_ON') === 'true'
              ? [
                  createDailyRotateTrasnport({
                    level: 'error',
                    filename: 'error',
                    dirname: configService.get('LOG_DIR' || 'logs'),
                  }),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  providers: [LogService, WinstonLogger],
  exports: [LogService, WinstonLogger],
})
export class LogModule {}
