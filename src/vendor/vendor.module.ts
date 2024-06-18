import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { ClassificationModule } from './classification/classification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '@/vendor/entities/vendor.entity';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports: [ClassificationModule, TypeOrmModule.forFeature([Vendor])],
})
export class VendorModule {}
