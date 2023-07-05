import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';

const SmsClient = tencentcloud.sms.v20210111.Client;

@Injectable()
export class AuthService {
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
      secretId: process.env.TENCENT_SECRET_ID,
      secretKey: process.env.TENCENT_SECRET_KEY,
      SmsSdkAppId: process.env.TENCENT_SMS_SDK_APP_ID,
      SignName: process.env.TENCENT_SMS_SIGN_NAME,
      TemplateId: process.env.TENCENT_SMS_TEMPLATE_ID,
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

  // 生成随机昵称 用户+随机字符串
  getRandomNickname() {
    const randomString = Math.random().toString(36).substr(2);
    return `用户${randomString}`;
  }
}
