import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthRolePermission } from '@/auth/casl/entities/auth-role-permission.entity';


@Entity({ name: 'auth_role' })
export class AuthRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: true,
    name: 'active',
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => AuthRolePermission, rolePermission => rolePermission.role)
  rolePermissions: AuthRolePermission[];
}