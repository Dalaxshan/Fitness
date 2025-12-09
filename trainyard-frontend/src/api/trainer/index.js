import { API_CONSTANTS } from 'src/network/NetworkConstants';
import apiManager from 'src/network/ApiManager';

class TrainerApi {
  // Get all trainer users
  async getAllTrainer() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.trainer);
        const trainers = response.data;
        resolve(trainers);
      } catch (error) {
        console.error('[Trainer Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  //create trainer
  async createTrainer(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.post(API_CONSTANTS.trainer, data);
        resolve(response.data);
      } catch (error) {
        console.error('[Trainer Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  //delete trainer details
  async deleteTrainer(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.delete(`${API_CONSTANTS.trainer}/${id}`);
        resolve(response.data);
      } catch (error) {
        console.error('[Trainer Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }
}

export const trainerApi = new TrainerApi();
