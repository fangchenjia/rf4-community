import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ApiException } from 'shared/exceptions/api.exception';
import * as OSS from 'ali-oss';

@Injectable()
export class OssService {
  private client: any;
  constructor(private readonly configService: ConfigService) {
    this.client = new OSS({
      accessKeyId: this.configService.get('OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('OSS_ACCESS_KEY_SECRET'),
      region: this.configService.get('OSS_REGION'),
      bucket: this.configService.get('OSS_BUCKET'),
    });
  }

  // 创建存储空间。
  private async putBucket() {
    try {
      const options = {
        storageClass: 'Archive', // 存储空间的默认存储类型为标准存储，即Standard。如果需要设置存储空间的存储类型为归档存储，请替换为Archive。
        acl: 'public-read', // 存储空间的默认读写权限为私有，即private。如果需要设置存储空间的读写权限为公共读，请替换为public-read。
        dataRedundancyType: 'ZRS', // 存储空间的默认数据容灾类型为本地冗余存储，即LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为ZRS。
      };
      const result = await this.client.putBucket('test', options);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  // 列举所有的存储空间
  private async listBuckets() {
    try {
      const result = await this.client.listBuckets();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  // 上传文件到oss 并返回  图片oss 地址
  public async putOssFile(
    ossPath: string,
    localPath: string | Buffer,
  ): Promise<string> {
    let res: any;
    try {
      res = await this.client.put(ossPath, localPath);
      // 将文件设置为公共可读
      await this.client.putACL(ossPath, 'public-read');
    } catch (error) {
      throw new ApiException({
        code: ErrorEnum.THIRD_PARTY_SERVICE_ERROR.code,
        message: error,
      }); // 其他错误
    }
    return res.url;
  }
  // 删除文件
  public async deleteFile(ossPaths: string[]): Promise<void> {
    try {
      return await this.client.deleteMulti(ossPaths);
    } catch (error) {
      throw new ApiException({
        code: ErrorEnum.THIRD_PARTY_SERVICE_ERROR.code,
        message: error,
      }); // 其他错误
    }
  }
  /**
   * 获取文件的url
   * @param filePath
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
      console.log('get file signature failed: file name can not be empty');
      return null;
    }
    let result = '';
    try {
      result = this.client.signatureUrl(filePath, { expires: 36000 });
    } catch (err) {
      console.log(err);
    }
    return result;
  }
}
