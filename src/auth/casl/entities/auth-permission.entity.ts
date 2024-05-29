import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthObject } from '@/auth/casl/entities/auth-object.entity';
import { AuthRole } from '@/auth/casl/entities/auth-role.entity';

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

  @ManyToMany(() => AuthRole, (role) => role.permissions)
  roles: AuthRole[];

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
