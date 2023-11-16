/**
 * 
 * 时间格式转换 少于一分钟显示“刚刚” 一分钟到一小时显示“X分钟前” 一小时到一天显示“X小时前” 否则显示日期 YYYY-MM-DD
 * @param {string} time 
 * @returns {string}
 */
export const formatTimeAgo = (time: string): string => {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) {
    return '刚刚';
  }
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`;
  }
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}