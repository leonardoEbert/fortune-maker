import { Injectable } from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';
import { ILike, Repository } from 'typeorm';
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
        where: { id: createClassificationDto.parentClassification.id },
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

  update(id: string, updateClassificationDto: UpdateClassificationDto) {
    return this.vendorClassificationRepository.update(
      id,
      updateClassificationDto,
    );
  }

  remove(id: string) {
    return this.vendorClassificationRepository.softDelete(id);
  }

  async getByPage(
    page: number,
    pageSize: number,
    searchField: string,
    searchTerm: string,
  ) {
    const offset = (page - 1) * pageSize;

    let conditions = {};

    if (searchTerm !== '') {
      conditions = {
        [searchField]: ILike(`%${searchTerm}%`),
      };
    }

    const [classifications, total] =
      await this.vendorClassificationRepository.findAndCount({
        skip: offset,
        take: pageSize,
        relations: {
          parentClassification: true,
        },
        where: {
          ...conditions,
        },
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
