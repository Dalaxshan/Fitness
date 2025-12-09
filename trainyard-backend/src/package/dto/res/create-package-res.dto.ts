import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageResponseDto {
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
