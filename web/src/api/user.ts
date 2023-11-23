export const USER_LOGIN = '/v1/auth/login'
export const USER_REGISTER = '/v1/auth/register'
export const USER_INFO = '/v1/auth/info'
export const REFRESH_TOKEN = '/v1/auth/refresh-token'
export const RESET_PASSWORD = '/v1/auth/reset-password'
export const UPDATE_USER = '/v1/user/update-info'

import { type UserInfo } from '@/types/user'

import request from '@/utils/request'

type userRegisterPrarms = {
  smsCode: string
  mobile: string
  password: string,
  avatar?: string
}

type userUpdatePrarms = {
  nickname?: string
  avatar?: string
  description?: string
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
  return request.get<UserInfo>(USER_INFO)
}

export const userLogin = (params: userLoginPrarms) => {
  return request.post<userLoginResponse>(USER_LOGIN, params)
}

export const userRegister = (params: userRegisterPrarms) => {
  return request.post(USER_REGISTER, params)
}

export const resetPassword = (params: userRegisterPrarms) => {
  return request.post(RESET_PASSWORD, params)
}

export const getRefreshToken = (params: refreshTokenPrarms) => {
  return request.post<{accessToken: string}>(REFRESH_TOKEN, params)
}

export const updateUser = (params: userUpdatePrarms) => {
  return request.post<UserInfo>(UPDATE_USER, params)
}