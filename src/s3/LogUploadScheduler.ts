import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as path from 'path';
import * as fs from 'fs';
import { S3Service } from './s3.service';
import { DAILY_RESET } from 'src/daily-quests/users-daily-quests/const/users-daily-quests.const';
import { nowKST } from 'src/common/function/time.helper';

@Injectable()
export class LogUploadScheduler {
  private readonly logger = new Logger(LogUploadScheduler.name);

  constructor(private readonly s3Service: S3Service) {}

  // 매일 자정에 실행
  @Cron(DAILY_RESET)
  async handleLogUpload() {
    // 현재 날짜를 YYYY-MM-DD 형식으로 구함
    const dateStr = nowKST().toISOString().split('T')[0];
    const logConfigs = [
      {
        dir: path.join(process.cwd(), 'logs/info'),
        fileName: `app-${dateStr}.log`,
      },
      {
        dir: path.join(process.cwd(), 'logs/error'),
        fileName: `error-${dateStr}.log`,
      },
    ];

    for (const config of logConfigs) {
      const filePath = path.join(config.dir, config.fileName);
      if (fs.existsSync(filePath)) {
        // S3 내 업로드 경로는 원본 경로를 유지하거나 필요에 따라 재구성할 수 있음
        const s3Key = path.join(path.basename(config.dir), config.fileName);
        try {
          const result = await this.s3Service.uploadFile(filePath, s3Key);
          this.logger.log(`로그 파일 업로드 성공: ${result.Location}`);
          // 업로드 후 로컬 로그 파일을 삭제하거나 보관 정책에 따라 처리 가능
        } catch (error) {
          this.logger.error(`S3 업로드 실패 (${filePath})`, error);
        }
      } else {
        this.logger.warn(`업로드할 로그 파일이 존재하지 않습니다: ${filePath}`);
      }
    }
  }
}
