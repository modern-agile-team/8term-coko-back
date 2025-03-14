import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerConfigService } from './logger.config';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: LoggerConfigService,
    }),
  ],
  providers: [],
  exports: [],
})
export class LoggerModule {}
