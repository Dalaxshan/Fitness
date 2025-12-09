import { ApiProperty } from '@nestjs/swagger';

export class CreateMembershipResponseDto {
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  member: string;

  @ApiProperty()
  package: string;
}
