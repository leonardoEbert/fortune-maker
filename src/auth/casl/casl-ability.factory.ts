import { PureAbility } from '@casl/ability';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/user.entity';
import { AuthPermission } from '@/auth/casl/entities/auth-permission.entity';
import { PermissionActionEnum } from '@/common/enum/permission-action.enum';

export type PermissionObjectType = any;
export type AppAbility = PureAbility<
  [PermissionActionEnum, PermissionObjectType]
>;
interface CaslPermission {
  action: PermissionActionEnum;
  subject: string;
}

export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}
  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions: AuthPermission[] =
      await this.authService.findAllPermissionsOfUser(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: p.action,
      subject: p.authObject.name,
    }));
    return new PureAbility<[PermissionActionEnum, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
