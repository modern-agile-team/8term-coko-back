import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async uploadFile(
    filePath: string,
    s3Key: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const fileStream = fs.createReadStream(filePath);
    const params = {
      Bucket: this.bucketName,
      Key: s3Key,
      Body: fileStream,
    };

    return await this.s3.upload(params).promise();
  }
}
