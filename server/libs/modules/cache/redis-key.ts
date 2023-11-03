// 生成常见的key
export function generateAccessTokenKey(userId: string): string {
  return `accessToken:${userId}`;
}
export function generateRefreshTokenKey(userId: string): string {
  return `refreshToken:${userId}`;
}
export function generateSmsCodeKey(phone: string, suffix?: string): string {
  return `smsCode:${phone}${suffix ? `:${suffix}` : ''}`;
}

// 用户权限校验key
export function generateUserPermissionKey(userId: string): string {
  return `userPermission:${userId}`;
}
