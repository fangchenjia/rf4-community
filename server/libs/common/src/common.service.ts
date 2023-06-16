import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CommonService {
  // 生成验证码
  async captche(size = 4) {
    const captcha = svgCaptcha.create({
      //可配置返回的图片信息
      size, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    return captcha;
  }
}
