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

  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  findAll() {
    return `This action returns all vendor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
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
