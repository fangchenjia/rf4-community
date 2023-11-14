/**
 * 统一错误代码定义
 */
export const ErrorEnum = {
  INVALID_INPUT: {
    code: 10000,
    message: '参数校验异常',
  },
  UNKNOWN_ERROR: {
    code: 10002,
    message: '未知错误',
  },
  // 三方服务错误
  THIRD_PARTY_SERVICE_ERROR: {
    code: 10003,
    message: '三方服务错误',
  },
  USER_EXIST: {
    code: 10001,
    message: '用户已存在',
  },
  // 图形验证码相关
  INVALID_CAPTCHA: {
    code: 10011,
    message: '图形验证码错误',
  },
  CAPTCHA_EXPIRED: {
    code: 10012,
    message: '图形验证码过期',
  },
  // 短信验证码相关
  INVALID_SMS_CODE: {
    code: 10020,
    message: '短信验证码错误',
  },
  SMS_CODE_EXPIRED: {
    code: 10021,
    message: '短信验证码过期',
  },
  SMS_CODE_ONE_MINUTE_LIMIT: {
    code: 10022,
    message: '1分钟内只能发送一次短信验证码',
  },
  SMS_CODE_LIMIT: {
    code: 10023,
    message: '短信验证码发送过于频繁',
  },
  // 用户相关
  INVALID_USER: {
    code: 10003,
    message: '用户名或密码错误',
  },
  USER_DISABLED: {
    code: 10004,
    message: '用户已被禁用',
  },
  USER_DELETED: {
    code: 10005,
    message: '用户已被删除',
  },
  USER_NOT_EXIST: {
    code: 10017,
    message: '用户不存在',
  },
  // token相关
  TOKEN_ERROR: {
    code: 11000,
    message: '错误的token',
  },
  INVALID_TOKEN: {
    code: 11001,
    message: '登录无效或在别处登录',
  },
  TOKEN_EXPIRED: {
    code: 11002,
    message: 'accessToken过期',
  },
  REFRESH_TOKEN_EXPIRED: {
    code: 11004,
    message: '登录已过期',
  },
  NO_PERMISSION: {
    code: 11003,
    message: '无权限，请联系管理员申请权限',
  },
  // dist管理
  DIST_EXIST: {
    code: 12000,
    message: '字典项已存在',
  },
  // 上传文件
  MAX_FILE_SIZE: {
    code: 13000,
    message: '文件大小超过限制',
  },
  FILE_TYPE_ERROR: {
    code: 13001,
    message: '文件类型错误',
  },
} as const;

export type ErrorEnumType = {
  code: number;
  message: string;
};
