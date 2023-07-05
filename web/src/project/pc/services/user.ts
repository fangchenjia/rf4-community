import request from './request';
import { USER_LOGIN,USER_REGISTER } from '@/api';


type UserLoginParams = {
  mobile: string;
  password: string;
}
type UserRegisterParams = {
  mobile: string;
  password: string;
  smsCode: string;
}
export function userLogin(data: UserLoginParams) {
  return request.post(USER_LOGIN, data)
}

export function userRegister(data: UserRegisterParams) {
  return request.post(USER_REGISTER, data)
}