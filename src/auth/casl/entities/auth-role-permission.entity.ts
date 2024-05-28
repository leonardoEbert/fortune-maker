import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthRole } from '@/auth/casl/entities/auth-role.entity';
import { AuthPermission } from '@/auth/casl/entities/auth-permission.entity';

@Entity('auth_role_permission')
export class AuthRolePermission {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AuthRole, role => role.rolePermissions)
  role: AuthRole;

  @ManyToOne(() => AuthPermission, permission => permission.rolePermissions)
  permission: AuthPermission;
}