import { API_CONSTANTS } from 'src/network/NetworkConstants';
import apiManager from 'src/network/ApiManager';

class AdminApi {
  async createAdmin(request) {
    const { name, email, password, role } = request;

    try {
      const response = await apiManager.post(API_CONSTANTS.admin, {
        name,
        email,
        password,
        role,
      });

      return response.data.data;
    } catch (err) {
      console.error('[Admin Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  //get admin user by id
  async getAdminById(id) {
    try {
      const response = await apiManager.get(`${API_CONSTANTS.admin}/${id}`);
      return response.data;
    } catch (err) {
      console.error('[Admin Api - getAdminById Error]:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to get admin data');
    }
  }

  // Get all admin users
  async getAllAdmin() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.admin);
        const admins = response.data;
        resolve(admins);
      } catch (error) {
        console.error('[Admin Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  //Edit admin user
  async editAdmin(id, request) {
    const { name, email, role } = request;

    try {
      const response = await apiManager.put(`${API_CONSTANTS.admin}/${id}`, {
        name,
        email,
        role,
      });

      return response.data.data;
    } catch (err) {
      console.error('[Admin Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  //delete admin
  async deleteAdmin(id) {
    try {
      const response = await apiManager.delete(`${API_CONSTANTS.admin}/${id}`);
      return response;
    } catch (err) {
      console.log('[Admin Api]', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }
}

export const adminApi = new AdminApi();
