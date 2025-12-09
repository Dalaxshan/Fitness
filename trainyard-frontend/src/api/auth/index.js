import apiManager from 'src/network/ApiManager';
import { API_CONSTANTS } from 'src/network/NetworkConstants';

class AuthApi {
  async signIn(request) {
    const { email, password } = request;

    return new Promise(async (resolve, reject) => {
      try {

        const response = await apiManager.post(API_CONSTANTS.login, {
          email,
          password,
        })

        resolve(response.data.data);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error(err.response?.data?.message || err.message));
      }
    });
  }

  async refreshToken(request) {
    const { refreshToken } = request;

    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.post(API_CONSTANTS.refreshToken, {
          refreshToken,
        });

        resolve(response.data.data);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error(err.response?.data?.message || err.message));
      }
    });
  }
}

export const authApi = new AuthApi();
