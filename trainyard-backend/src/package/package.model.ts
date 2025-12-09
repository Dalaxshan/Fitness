import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class PackageModel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: string;

  @Prop({
    required: true,
  })
  duration: string;

  @Prop({
    required: true,
  })
  code: string;
}

export const PackageSchema = SchemaFactory.createForClass(PackageModel);
