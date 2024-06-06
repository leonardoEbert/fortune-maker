import { Injectable } from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';
import { Repository } from 'typeorm';
import { PaginatedResponse } from '@/common/types/paginated-response.type';

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

  remove(id: string) {
    return this.vendorClassificationRepository.softDelete(id);
  }

  async getByPage(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;

    const [classifications, total] =
      await this.vendorClassificationRepository.findAndCount({
        skip: offset,
        take: pageSize,
      });

    const totalPages = Math.ceil(total / pageSize);

    const paginatedVendorClassifications: PaginatedResponse<VendorClassification> =
      {
        data: classifications,
        total,
        page,
        totalPages,
      };

    return paginatedVendorClassifications;
  }
}
