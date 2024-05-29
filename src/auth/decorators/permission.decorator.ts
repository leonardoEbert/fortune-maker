import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionActionEnum } from '@/common/enum/permission-action.enum';
import { PermissionObjectType } from '@/auth/casl/casl-ability.factory';

export type RequiredPermission = [PermissionActionEnum, PermissionObjectType];
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);
