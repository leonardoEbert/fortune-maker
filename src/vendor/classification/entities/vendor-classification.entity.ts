import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from '@/database/abstract.entity';

@Entity('vendor_classification')
export class VendorClassification extends AbstractEntity<VendorClassification> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(
    () => VendorClassification,
    (classification) => classification.subClassifications,
    { nullable: true },
  )
  @JoinColumn({ name: 'parent_classification_id' })
  parentClassification: VendorClassification;

  @OneToMany(
    () => VendorClassification,
    (classification) => classification.parentClassification,
    { nullable: true },
  )
  subClassifications: VendorClassification[];

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
