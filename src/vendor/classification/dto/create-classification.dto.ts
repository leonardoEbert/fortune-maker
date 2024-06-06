import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';

export class CreateClassificationDto {
  name: string;
  description: string;
  isActive: boolean;
  parentClassification: VendorClassification;
}
