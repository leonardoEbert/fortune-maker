import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(id);
  }

  @Get('paginated')
  paginated(
    @Query('currentPage') page: number,
    @Query('pageSize') pageSize: number,
    @Query('searchField') searchField: string,
    @Query('searchTerm') searchTerm: string,
  ) {
    return this.vendorService.getByPage(
      page,
      pageSize,
      searchField,
      searchTerm,
    );
  }
}
