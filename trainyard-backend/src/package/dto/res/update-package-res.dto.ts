import { ApiProperty } from '@nestjs/swagger';

export class UpdatePackageResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  code: string;
}
