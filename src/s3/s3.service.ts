import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFile(filePath: string, s3Key: string): Promise<any> {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: this.bucketName,
      Key: s3Key,
      Body: fileStream,
    };

    // Upload 클래스를 사용하여 멀티파트 업로드 지원
    const parallelUpload = new Upload({
      client: this.s3Client,
      params: uploadParams,
    });

    return await parallelUpload.done();
  }
}
