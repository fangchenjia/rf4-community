import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService, generateSmsCodeKey } from 'libs/cache';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ApiException } from 'shared/exceptions/api.exception';
import * as svgCaptcha from 'svg-captcha';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import { Dict } from 'libs/db/models/dict.model';
import { InjectModel } from 'nestjs-typegoose';
import { QueryDictDto } from './common.dto';
import { OssService } from './oss.service';
import { Image } from 'libs/db/models/image.model';

const SmsClient = tencentcloud.sms.v20210111.Client;

@Injectable()
export class CommonService {
  constructor(
    private readonly configService: ConfigService,
    private redisCacheService: RedisCacheService,
    private ossService: OssService,
    @InjectModel(Dict) private readonly dictModel,
    @InjectModel(Image) private readonly imageModel,
  ) {}
  /**
   *
   * @param type 图片类型 头像、点位投稿图片...
   * @param file 图片文件
   * @returns ossUrl 图片地址
   */
  async uploadImage(type: string, file: Express.Multer.File) {
    // 生成随机文件名
    const suffix = file.originalname?.split('.').pop() || 'png';
    let filename = type + Date.now() + '.' + suffix;
    filename = `rf4-community/${type}/${filename}`;
    const ossUrl = await this.ossService.putOssFile(filename, file.buffer);
    await this.imageModel.create({
      imageUrl: ossUrl,
      imageName: filename,
      type,
      used: false,
    });
    return ossUrl;
  }

  async ossClear() {
    // 找到没有使用过的图片
    const images = await this.imageModel.find({
      used: false,
    });
    const imageNames = images.map((image) => image.imageName);
    // 删除oss
    await this.ossService.deleteFile(imageNames);
    // 删除数据库
    await this.imageModel.deleteMany({
      used: false,
    });
  }
  // 生成验证码
  async captche(size = 4) {
    const captcha = svgCaptcha.create({
      //可配置返回的图片信息
      size, //生成几个验证码
      fontSize: 40, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#f1f3f4', //背景颜色
    });
    return captcha;
  }

  // 发送短信
  async sms(phone: string, code: string) {
    //腾讯云短信配置文件,这些在腾讯云控制台都能看见
    const config = {
      secretId: this.configService.get('TENCENT_SECRET_ID'),
      secretKey: this.configService.get('TENCENT_SECRET_KEY'),
      SmsSdkAppId: this.configService.get('TENCENT_SMS_SDK_APP_ID'),
      SignName: this.configService.get('TENCENT_SMS_SIGN_NAME'),
      TemplateId: this.configService.get('TENCENT_SMS_TEMPLATE_ID'),
      Time: 5,
    };
    const client = new SmsClient({
      credential: {
        secretId: config.secretId,
        secretKey: config.secretKey,
      },
      region: 'ap-guangzhou',
    });
    const res = await client.SendSms({
      PhoneNumberSet: [`+86${phone}`],
      SmsSdkAppId: config.SmsSdkAppId,
      TemplateId: config.TemplateId,
      SignName: config.SignName,
      TemplateParamSet: [code],
    });
    return res;
  }

  // 获取短信验证码
  async getSmsCaptcha(mobile: string) {
    const smsCodeCacheKey = generateSmsCodeKey(mobile);
    // 检查1分钟内是否发送过验证码
    const smsCodeCache = await this.redisCacheService.cacheGet(smsCodeCacheKey);
    if (smsCodeCache?.lastTime) {
      if (Date.now() - Number(smsCodeCache.lastTime) < 60 * 1000) {
        throw new ApiException(ErrorEnum.SMS_CODE_ONE_MINUTE_LIMIT); // 1分钟内只能发送一次
      }
    }
    // 生成6位数验证码
    const code = this.getRandomSmsCode();
    // 记录验证码发送时间
    await this.redisCacheService.cacheSet(smsCodeCacheKey, {
      code,
      lastTime: Date.now(), // 最后一次发送时间
      validateCount: 0, // 验证次数
    });
    console.log(code);
    const smsRes = await this.sms(mobile, String(code));
    const limitErrType = [
      'LimitExceeded.PhoneNumberDailyLimit',
      'LimitExceeded.PhoneNumberOneHourLimit',
      'LimitExceeded.PhoneNumberSameContentDailyLimit',
      'LimitExceeded.PhoneNumberTwentyHourLimit',
      'LimitExceeded.PhoneNumberTwentyFourHourLimit',
      'LimitExceeded.PhoneNumberFiveMinuteLimit',
    ];
    const smsStatus = smsRes.SendStatusSet[0];
    if (smsStatus.Code === 'Ok') {
      return {
        requestId: smsRes.RequestId,
        phoneNumber: smsStatus.PhoneNumber,
      };
    } else if (limitErrType.includes(smsStatus.Code)) {
      throw new ApiException(ErrorEnum.SMS_CODE_LIMIT); // 短信发送次数限制
    } else {
      throw new ApiException({
        code: ErrorEnum.THIRD_PARTY_SERVICE_ERROR.code,
        message:
          smsStatus.Message || ErrorEnum.THIRD_PARTY_SERVICE_ERROR.message,
      }); // 其他错误
    }
  }
  // 获取6位随机数验证码
  getRandomSmsCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  // 获取字典
  async dict(queryParam: QueryDictDto) {
    const dictList = await this.dictModel.find({
      type: queryParam.type,
    });
    return dictList;
  }
}
