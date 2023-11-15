import { v4 as uuid } from 'uuid';
import Identicon from 'identicon.js';

/**
 * 从给定的URL下载文件。
 *
 * @param {string} fileStr - 要下载的文件的URL。
 * @param {object} options - 下载的可选参数。
 * @param {string} options.fileName - 下载的文件名。如果未提供，将使用随机UUID。
 * @param {string} options.fileType - 下载的文件类型。
 */
export function downFile(fileStr: string, options: { fileName?: string, fileType: string}) {
  const anchorEl = document.createElement('a');
  anchorEl.href = fileStr;
  anchorEl.download = `${options.fileName || uuid()}.${options.fileType}`;
  document.body.appendChild(anchorEl); // required for firefox
  anchorEl.click();
  anchorEl.remove();
}


/**
 * 
 * 生成随机像素头像
 * @param { number } size 头像尺寸
 * @return { string } 图片base64
 */
export function generateRandomPixelAvatar(size: number): string {
  const hash = uuid();
  const base64 = new Identicon(hash, {
    margin: 0,
    size
  }).toString();
  return `data:image/png;base64,${base64}`;
}
