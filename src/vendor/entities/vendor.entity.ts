import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => VendorClassification)
  @JoinTable()
  classifications: VendorClassification[];

  @Column({
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
    name: 'is_active',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
