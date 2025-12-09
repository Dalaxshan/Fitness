import apiManager from 'src/network/ApiManager';
import { API_CONSTANTS } from 'src/network/NetworkConstants';

class MembershipApi {
  async createPackage(request) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.post(API_CONSTANTS.package, request);
        resolve(response.data.data);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error(err.response?.data?.message || err.message));
      }
    });
  }

  async getAllPackages() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.package);
        resolve(response.data);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error(err.response?.data?.message || err.message));
      }
    });
  }

  async getAllMemberships() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.getAllMemberships);
        resolve(response.data);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error(err.response?.data?.message || err.message));
      }
    });
  }

  async createMembership(request) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.post(API_CONSTANTS.createMembership, request);
        resolve(response.data.data);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error(err.response?.data?.message || err.message));
      }
    });
  }

  //edit package API
  async editPackage(packageId, updatedData) {
    try {
      const response = await apiManager.put(`${API_CONSTANTS.package}/${packageId}`, updatedData);
      return response.data.data;
    } catch (err) {
      console.error('[Auth Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  //getPackageDetails API
  async getPackageDetail(packageId) {
    try {
      const response = await apiManager.get(`${API_CONSTANTS.package}/${packageId}`);
      return response.data;
    } catch (err) {
      console.error('[Auth Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  //delete package API
  async deletePackage(id) {
    try {
      const response = await apiManager.delete(`${API_CONSTANTS.package}/${id}`);
      return response;
    } catch (err) {
      console.error('[Auth Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }
}

export const membershipApi = new MembershipApi();
