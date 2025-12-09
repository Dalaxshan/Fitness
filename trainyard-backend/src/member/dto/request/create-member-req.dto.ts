import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateMemberRequestDto {
  @ApiProperty()
  @IsString({ message: 'First name must be a string' })
  @Length(3, 50, { message: 'First name must be between 3 and 50 characters' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Last name must be a string' })
  @Length(3, 50, { message: 'Last name must be between 3 and 50 characters' })
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Contact number must be a string' })
  contactNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Contact number must be a string' })
  otherContactNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  @Length(3, 150, { message: 'Address must be between 3 and 150 characters' })
  address: string;

  @ApiProperty()
  @IsString({ message: 'Nationality must be a string' })
  @IsOptional()
  nationality?: string;

  @ApiProperty()
  @IsString({ message: 'Postal Code must be a string' })
  @IsOptional()
  postalCode?: string;

  @ApiProperty()
  @IsOptional()
  occupation?: string;

  @ApiProperty()
  @IsString({ message: 'NIC or Passport must be a string' })
  @IsOptional()
  nicOrPassport?: string;

  @ApiProperty()
  @IsOptional()
  profileImage?: string;

  @ApiProperty()
  @IsBoolean({ message: 'Has health issues must be a boolean' })
  hasHealthIssues: boolean;

  @ApiProperty()
  @IsString({ message: 'Emergency contact name must be a string' })
  emergencyContactName: string;

  @ApiProperty()
  @IsString({ message: 'Emergency contact number must be a string' })
  emergencyContactNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  country?: string;

  @ApiProperty()
  @IsOptional()
  vehileRegNo?: string;
}
