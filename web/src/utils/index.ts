import { v4 as uuid } from 'uuid';

export function downFile(fileStr: string, options: { fileName?: string, fileType: string}) {
  const anchorEl = document.createElement('a');
  anchorEl.href = fileStr;
  anchorEl.download = `${options.fileName || uuid()}.${options.fileType}`;
  document.body.appendChild(anchorEl); // required for firefox
  anchorEl.click();
  anchorEl.remove();
}