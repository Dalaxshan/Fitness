import { InjectModel } from '@nestjs/mongoose';
import { PackageModel } from './package.model';
import { Model } from 'mongoose';
import { CreatePackageRequestDto } from './dto/req/create-package-req.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdatePackageRequestDto } from './dto/req/update-package-req.dto';

export class PackageService {
  constructor(
    @InjectModel('Package') private readonly packageModel: Model<PackageModel>,
  ) {}

  /**
   * Get All packages
   * @returns All packages
   */
  async getAllPackages() {
    const packages = await this.packageModel.find().exec();
    return packages;
  }

  /**
   * Get Package by name
   * @param name package name
   * @returns Package
   */

  async getPackageByName(name: string) {
    const packages = await this.packageModel.findOne({ name }).exec();
    return packages;
  }

  /**
   * Get Package by Id
   * @param id package id
   * @returns Package
   */

  async getPackageById(id: string) {
    const packages = await this.packageModel.findById(id).exec();
    return packages;
  }

  /**
   * Create Package
   * @param createPackageDto Create Package DTO
   * @returns Created Package
   */
  async createPackage(createPackageDto: CreatePackageRequestDto) {
    const packageExists = await this.getPackageByName(createPackageDto.name);
    if (packageExists) {
      throw new HttpException('Package already exists', HttpStatus.BAD_REQUEST);
    }

    const newPackage = await this.packageModel.create(createPackageDto);

    return newPackage;
  }

  /**
   * Edit Package
   * @param packageId ID of the package to be edited
   * @param updatePackageDto Data for updating the package
   * @returns Edited Package
   */
  async editPackage(
    packageId: string,
    updatePackageDto: UpdatePackageRequestDto,
  ) {
    // Check if the package exists
    const packageExists = await this.packageModel.findById(packageId).exec();
    if (!packageExists) {
      throw new HttpException('Package does not exist', HttpStatus.BAD_REQUEST);
    }

    // Update the package and return the edited package
    const editedPackage = await this.packageModel
      .findOneAndUpdate({ _id: packageId }, updatePackageDto, { new: true })
      .exec();

    return editedPackage;
  }

  /**
   * Delete Package
   * @param id ID of the package to be deleted
   * @returns Deleted Package
   */
  async deletePackage(id: string) {
    const deletePackage = await this.packageModel.findByIdAndDelete(id).exec();
    if (!deletePackage) {
      throw new HttpException('Package does not exist', HttpStatus.BAD_REQUEST);
    }
    return deletePackage;
  }
}
