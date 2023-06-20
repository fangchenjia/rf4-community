// 导出一个判断移动端的方法
export const isMobile = () => {
  // 判断是否为移动端
  const ua = navigator.userAgent
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  return isMobile
}