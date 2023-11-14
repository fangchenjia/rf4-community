export const CAPTCHA = '/v1/common/captcha'
export const SMS_CODE = '/v1/common/sms'
export const UPLOAD_IMG = '/v1/common/uploadImage'

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

export const uploadImg = (params: any) => {
  return request.post(UPLOAD_IMG, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}