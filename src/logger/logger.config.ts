import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';
import { errorOnlyFilter, nonErrorFilter } from './logger.filters';
import { LoggerSetting } from './logger.constants';

@Injectable()
export class LoggerConfigService {
  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
        // 에러 로그 파일
        new DailyRotateFile({
          dirname: path.join(process.cwd(), 'logs/error'),
          filename: 'error-%DATE%.log', // 파일 이름
          datePattern: 'YYYY-MM-DD', // 저장 파일이 나뉘는 시간 기준 ( 일별로 분리 )
          maxSize: LoggerSetting.LOG_FILE_SIZE,
          maxFiles: LoggerSetting.LOG_SAVE_CYCLE,
          level: 'error',
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            errorOnlyFilter(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf((info) => {
              const stack = info.stack ? `\n${info.stack}` : '';
              return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}${stack}`;
            }),
          ),
        }),
        // 기본 로그 파일
        new DailyRotateFile({
          dirname: path.join(process.cwd(), 'logs/info'),
          filename: 'app-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: LoggerSetting.LOG_FILE_SIZE,
          maxFiles: LoggerSetting.LOG_SAVE_CYCLE,
          level: 'info',
          format: winston.format.combine(
            nonErrorFilter(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) =>
                `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
            ),
          ),
        }),
      ],
    };
  }
}
