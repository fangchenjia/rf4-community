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
