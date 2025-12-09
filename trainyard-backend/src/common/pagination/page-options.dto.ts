import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SortOrder } from '../enums/sort-order.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PageOptionsDTO {
  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsEnum(SortOrder)
  @IsOptional()
  readonly order?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @Min(1)
  @Max(100)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly take?: number;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
