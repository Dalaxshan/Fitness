import { API_CONSTANTS } from 'src/network/NetworkConstants';
import apiManager from 'src/network/ApiManager';

class MemberApi {
  // Create a member
  async createMember(request) {
    try {
      const response = await apiManager.post(API_CONSTANTS.member, request);

      return response;
    } catch (err) {
      console.error('[Member Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  // Get all members
  async getAllMembers() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.member);
        const members = response?.data;
        resolve(members);
      } catch (error) {
        console.error('[Member Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  // Edit a member
  async editMember(memberId, updatedData) {
    try {
      const response = await apiManager.put(`${API_CONSTANTS.member}/${memberId}`, updatedData);
      const updatedMember = response.data.data;

      return updatedMember;
    } catch (err) {
      console.error('[Member Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  // Get a member by id
  async getMemberById(memberId) {
    try {
      const response = await apiManager.get(`${API_CONSTANTS.member}/${memberId}`);
      return response.data;
    } catch (err) {
      console.error('[Member Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  //delete admin
  async deleteMember(id) {
    try {
      const response = await apiManager.delete(`${API_CONSTANTS.member}/${id}`);
      return response;
    } catch (err) {
      console.log('[Member Api]', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }
}

export const memberApi = new MemberApi();
