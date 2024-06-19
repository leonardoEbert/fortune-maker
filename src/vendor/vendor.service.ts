import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ILike, Repository } from 'typeorm';
import { PaginatedResponse } from '@/common/types/paginated-response.type';
import { Vendor } from '@/vendor/entities/vendor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async create(createVendorDto: CreateVendorDto) {
    const newVendor = new Vendor({
      ...createVendorDto,
    });

    return await this.vendorRepository.save(newVendor);
  }

  findAll() {
    return this.vendorRepository.find();
  }

  findOne(id: string) {
    return this.vendorRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updateVendorDto: UpdateVendorDto) {
    return this.vendorRepository.update(id, updateVendorDto);
  }

  remove(id: string) {
    return this.vendorRepository.softDelete(id);
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

    const [classifications, total] = await this.vendorRepository.findAndCount({
      skip: offset,
      take: pageSize,
      relations: {
        classifications: true,
      },
      where: {
        ...conditions,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    const paginatedVendorClassifications: PaginatedResponse<Vendor> = {
      data: classifications,
      total,
      page,
      totalPages,
    };

    return paginatedVendorClassifications;
  }
}
