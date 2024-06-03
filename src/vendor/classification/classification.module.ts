import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationController } from './classification.controller';

@Module({
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
