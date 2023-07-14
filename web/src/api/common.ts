export const CAPTCHA = '/v1/common/captcha'
export const SMS_CODE = '/v1/common/sms'

import request from '@/utils/request'

type smsCodeParams = {
  mobile: string
  captcha: string
}
export const smsCode = (params: smsCodeParams) => {
  return request.post(SMS_CODE, params)
}

export const captcha = () => {
  return request.get(CAPTCHA)
}