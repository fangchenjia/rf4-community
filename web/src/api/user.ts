export const USER_LOGIN = '/v1/auth/login'
export const USER_REGISTER = '/v1/auth/register'
export const USER_INFO = '/v1/auth/info'
export const REFRESH_TOKEN = '/v1/auth/refresh-token'

import request from '@/utils/request'

type userRegisterPrarms = {
  smsCode: string
  mobile: string
  password: string
}

type userLoginPrarms = {
  mobile: string
  password: string
}

type userLoginResponse = {
  accessToken: string
  refreshToken: string
}

type refreshTokenPrarms = {
  refreshToken: string
}

export const userInfo = () => {
  return request.get(USER_INFO)
}

export const userLogin = (params: userLoginPrarms) => {
  return request.post<userLoginResponse>(USER_LOGIN, params)
}

export const userRegister = (params: userRegisterPrarms) => {
  return request.post(USER_REGISTER, params)
}

export const getRefreshToken = (params: refreshTokenPrarms) => {
  return request.post<{accessToken: string}>(REFRESH_TOKEN, params)
}