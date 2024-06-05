import { Injectable } from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(VendorClassification)
    private readonly vendorClassificationRepository: Repository<VendorClassification>,
  ) {}

  create(createClassificationDto: CreateClassificationDto) {
    return 'This action adds a new classification';
  }

  findAll() {
    return this.vendorClassificationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} classification`;
  }

  update(id: number, updateClassificationDto: UpdateClassificationDto) {
    return `This action updates a #${id} classification`;
  }

  remove(id: number) {
    return `This action removes a #${id} classification`;
  }
}
