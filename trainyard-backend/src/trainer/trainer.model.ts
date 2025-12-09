import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TrainerModel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  nicNo: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: [true, 'Phone number is required'],
  })
  contactNo: string;

  @Prop({
    required: [true, 'Email is required'],
  })
  email: string;

  @Prop({
    required: [true, 'Phone number is required'],
  })
  emergencyContactNo: string;

  @Prop({
    required: false,
  })
  memberName: string;

  @Prop({
    required: false,
  })
  startDate: Date;

  @Prop({
    required: false,
  })
  endDate: Date;

  @Prop({
    required: false,
  })
  amount: string;

  // @Prop({
  //   type: { type: Types.ObjectId, ref: 'Member' },
  // })
  // member: MemberModel;
}

export const TrainerSchema = SchemaFactory.createForClass(TrainerModel);
