import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { LogUploadScheduler } from './LogUploadScheduler';

@Module({
  imports: [],
  providers: [S3Service, LogUploadScheduler],
  exports: [],
})
export class S3Module {}
