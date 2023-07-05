import request from './request';
import { SMS_CODE } from '@/api';

type SmsCodeParams = {
  mobile: string;
  captcha: string;
}

export function smsCode(data: SmsCodeParams) {
  return request.post(SMS_CODE, data)
}