import request from './request';
import { USER_LOGIN,USER_REGISTER } from '@/api';

export function userLogin(data: any) {
  return request.post(USER_LOGIN, data)
}

export function userRegister(data: any) {
  return request.post(USER_REGISTER, data)
}