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

  async create(createClassificationDto: CreateClassificationDto) {
    const newVendorClassification = new VendorClassification({
      ...createClassificationDto,
    });

    newVendorClassification.parentClassification =
      await this.vendorClassificationRepository.findOne({
        where: { id: createClassificationDto.parentClassificationId },
      });

    return await this.vendorClassificationRepository.save(
      newVendorClassification,
    );
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

  count() {
    return this.vendorClassificationRepository.count({
      where: { isActive: true, deletedAt: null },
    });
  }
}
