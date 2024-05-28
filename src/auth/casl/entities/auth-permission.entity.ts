import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthObject } from '@/auth/casl/entities/auth-object.entity';
import { AuthRolePermission } from '@/auth/casl/entities/auth-role-permission.entity';

@Entity('auth_permission')
export class AuthPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  action: string;

  @ManyToOne(() => AuthObject, (authObject) => authObject.authPermissions)
  authObject: AuthObject;

  @OneToMany(() => AuthRolePermission, rolePermission => rolePermission.permission)
  rolePermissions: AuthRolePermission[];

  @Column({
    type: 'json',
    nullable: true,
  })
  condition: string;

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
}