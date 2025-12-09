import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberModel } from './member.model';
import { CreateMemberRequestDto } from './dto/request/create-member-req.dto';
import { UpdateMemberRequestDto } from './dto/request/update-member.req.dto';
import { UpdateMemberResponseDto } from './dto/response/update-member.res.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<MemberModel>,
  ) {}

  /**
   * Get All Members
   * @returns All Members
   */
  async getAllMembers() {
    const members = await this.memberModel.find().exec();
    return members;
  }

  /**
   * Get Member By Email
   * @param email Member Email
   * @returns Member
   */
  async getMemberByEmail(email: string) {
    const member = await this.memberModel.findOne({ email }).exec();
    return member;
  }

  /**
   * Create Member User
   * @param createClientDto Create Member DTO
   * @returns Created Member User
   */
  async registerNewMember(createMemberDto: CreateMemberRequestDto) {
    const memberExists = await this.getMemberByEmail(createMemberDto.email);
    if (memberExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newMember = new this.memberModel(createMemberDto);

    const result = await newMember.save();
    return result;
  }

  /**
   * Get Member By ID
   * @returns Member
   */
  async getMemberById(memberId: string) {
    const member = await this.memberModel.findById(memberId).exec();
    return member;
  }

  /**
   * Edit Member
   * @param memberId Member ID
   * @param updateMemberDto Update Member DTO
   * @returns Updated Member
   */

  async editMember(memberId: string, updateMemberDto: UpdateMemberRequestDto) {
    // Check if the member exists
    const memberExists = await this.memberModel.findById(memberId).exec();
    if (!memberExists) {
      throw new HttpException('member does not exist', HttpStatus.BAD_REQUEST);
    }

    // Update the member and return the edited member
    const editedMember = await this.memberModel
      .findOneAndUpdate({ _id: memberId }, updateMemberDto, { new: true })
      .exec();

    return editedMember;
  }

  /**
   * Delete Member
   * @param memberId Member ID
   * @returns Deleted Member
   */

  async deleteMember(memberId: String) {
    const deleteMember = await this.memberModel
      .findByIdAndDelete(memberId)
      .exec();
    if (!deleteMember) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }
    return deleteMember;
  }
}
