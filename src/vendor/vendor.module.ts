import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { ClassificationModule } from './classification/classification.module';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports: [ClassificationModule],
})
export class VendorModule {}
