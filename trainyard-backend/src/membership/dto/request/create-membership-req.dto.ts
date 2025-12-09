import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMembershipRequestDto {
  @ApiProperty()
  @IsMongoId()
  memberId: string;

  @ApiProperty()
  @IsMongoId()
  packageId: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsString()
  totalAmount: string;
}
