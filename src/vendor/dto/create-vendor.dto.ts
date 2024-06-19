import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';

export class CreateVendorDto {
  name: string;
  description: string;
  isActive: boolean;
  classifications?: VendorClassification[];
}
