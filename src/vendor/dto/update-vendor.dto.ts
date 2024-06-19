import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';
import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';

export class UpdateVendorDto extends PartialType(CreateVendorDto) {
  name: string;
  description: string;
  isActive: boolean;
  classifications?: VendorClassification[];
}
