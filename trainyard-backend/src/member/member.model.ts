import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { Gender } from 'src/common/enums/gender.enum';

@Schema({ timestamps: true })
export class MemberModel {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  contactNumber: string;

  @Prop({
    type: String,
    required: false,
  })
  otherContactNumber: string;

  @Prop({
    type: String,
    enum: [Gender.Male, Gender.Female, Gender.Other],
  })
  gender: string;

  @Prop({
    type: String,
    required: false,
  })
  address: string;

  @Prop({
    type: String,
    required: false,
  })
  postalCode: string;

  @Prop({
    type: String,
    required: false,
  })
  nicOrPassport: string;

  @Prop({
    type: String,
    required: false,
  })
  nationality: string;

  @Prop({
    type: String,
    required: false,
  })
  occupation: string;

  @Prop({
    type: String,
    required: false,
  })
  profileImage: string;

  @Prop({
    type: String,
    required: true,
    default: Role.User,
    enum: [Role.User],
  })
  role: Role;

  @Prop({
    type: Boolean,
    required: true,
  })
  hasHealthIssues: boolean;

  @Prop({
    type: String,
    required: true,
  })
  emergencyContactName: string;

  @Prop({
    type: String,
    required: true,
  })
  emergencyContactNumber: string;

  @Prop({
    type: Date,
    required: false,
  })
  dateOfBirth: Date;

  @Prop({
    type: String,
    required: false,
  })
  country: string;

  @Prop({
    type: String,
    required: false,
  })
  vehileRegNo: string;
}

export const MemberSchema = SchemaFactory.createForClass(MemberModel);
