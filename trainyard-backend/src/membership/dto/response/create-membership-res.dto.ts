import { ApiProperty } from '@nestjs/swagger';

export class CreateMembershipResponseDto {
  @ApiProperty()
  memberId: string;

  @ApiProperty()
  packageId: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  totalAmount: string;
}
