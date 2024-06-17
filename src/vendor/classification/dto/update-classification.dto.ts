import { PartialType } from '@nestjs/mapped-types';
import { CreateClassificationDto } from './create-classification.dto';

export class UpdateClassificationDto extends PartialType(
  CreateClassificationDto,
) {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
