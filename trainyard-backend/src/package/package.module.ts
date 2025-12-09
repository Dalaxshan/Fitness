import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageSchema } from './package.model';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Package', schema: PackageSchema }]),
  ],
  controllers: [PackageController],
  exports: [PackageService],
  providers: [PackageService],
})
export class PackageModule {}
