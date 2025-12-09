import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MembershipModel } from './membership.model';
import { CreateMembershipRequestDto } from './dto/request/create-membership-req.dto';
import { MemberService } from 'src/member/member.service';
import { PackageService } from 'src/package/package.service';
import { CreateMembershipResponseDto } from './dto/response/create-membership-res.dto';
import { SMSService } from 'src/sms/sms.service';
import { convertMobile } from 'src/common/constants/conver-mobile';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel('Membership')
    private readonly membershipModel: Model<MembershipModel>,
    private memberService: MemberService,
    private packageService: PackageService,
    private smsService: SMSService,
  ) {}

  /**
   * Create Membership
   * @param createMembershipDto Create Membership DTO
   * @returns Created Membership
   */
  async createNewMembership(createMembershipDto: CreateMembershipRequestDto) {
    const member = await this.memberService.getMemberById(
      createMembershipDto.memberId,
    );

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    const packageExists = await this.packageService.getPackageById(
      createMembershipDto.packageId,
    );

    if (!packageExists) {
      throw new BadRequestException('Package not found');
    }

    const newMembership = await this.membershipModel.create({
      memberId: member._id,
      packageId: packageExists._id,
      ...createMembershipDto,
    });

    if (member.contactNumber) {
      this.smsService.sendSMS({
        msisdn: [
          {
            mobile: convertMobile(member?.contactNumber),
          },
        ],
        message: `Hi ${member.firstName} ${member.lastName}, \nWelcome to TRAINYARD! \nYour membership is now active. Please find the details below. \n\nPackage: ${packageExists.name} \nPrice: ${packageExists.price} \n\nThank you! \nTRAINYARD`,
      });
    }

    return newMembership;
  }

  /**
   * Get all Memberships
   * @returns All Memberships
   */
  async getAllMemberships(): Promise<CreateMembershipResponseDto[]> {
    const memberships = await this.membershipModel
      .find()
      .populate('memberId', {
        firstName: 1,
        lastName: 1,
        email: 1,
      })
      .populate('packageId', {
        name: 1,
        description: 1,
        price: 1,
      })
      .sort({ createdAt: -1 })
      .exec();
    return memberships;
  }

  /**
   * Get Memberships by Member Id
   * @param memberId Member Id
   * @returns Memberships
   */
  async getMembershipsByMemberId(memberId: string) {
    const memberships = await this.membershipModel
      .find({ memberId })
      .populate('memberId', {
        firstName: 1,
        lastName: 1,
        email: 1,
      })
      .populate('packageId', {
        name: 1,
        description: 1,
        price: 1,
      })
      .sort({ createdAt: -1 })
      .exec();
    return memberships;
  }

  searchMemberships(memberId: string, packageId: string) {
    const query = {};

    if (memberId) {
      query['memberId'] = memberId;
    }

    if (packageId) {
      query['packageId'] = packageId;
    }

    return this.membershipModel
      .find(query)
      .populate('memberId', {
        firstName: 1,
        lastName: 1,
        email: 1,
      })
      .populate('packageId', {
        name: 1,
        description: 1,
        price: 1,
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}
