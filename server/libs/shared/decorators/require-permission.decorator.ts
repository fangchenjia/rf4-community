import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY_METADATA } from '../contants/decorator.contants';

export const RequirePermission = (permissions: string) => {
  return SetMetadata(PERMISSION_KEY_METADATA, permissions);
};
