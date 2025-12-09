import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { MemberModule } from 'src/member/member.module';
import { PackageModule } from 'src/package/package.module';
import { MembershipSchema } from './membership.model';
import { SMSModule } from 'src/sms/sms.module';

@Module({
  imports: [
    PackageModule,
    MemberModule,
    SMSModule,
    MongooseModule.forFeature([
      { name: 'Membership', schema: MembershipSchema },
    ]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
