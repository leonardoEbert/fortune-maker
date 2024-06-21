import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationController } from './classification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorClassification } from '@/vendor/classification/entities/vendor-classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendorClassification])],
  controllers: [ClassificationController],
  providers: [ClassificationService],
  exports: [ClassificationService],
})
export class ClassificationModule {}
