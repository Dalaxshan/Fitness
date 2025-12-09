import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

export class CreateMemberResponseDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  contactNumber?: string;

  @ApiProperty()
  otherContactNumber?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  nationality?: string;

  @ApiProperty()
  postalCode?: string;

  @ApiProperty()
  occupation?: string;

  @ApiProperty()
  nicOrPassport: string;

  @ApiProperty()
  profileImage?: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  hasHealthIssues: boolean;

  @ApiProperty()
  emergencyContactName: string;

  @ApiProperty()
  emergencyContactNumber: string;

  @ApiProperty()
  dateOfBirth?: Date;

  @ApiProperty()
  country?: string;

  @ApiProperty()
  vehileRegNo?: string;
}
