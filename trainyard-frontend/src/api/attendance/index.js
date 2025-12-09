import { API_CONSTANTS } from 'src/network/NetworkConstants';
import apiManager from 'src/network/ApiManager';

class AttendanceApi {
  async getAllAttendance() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.attendance);
        const attendance = response.data;
        resolve(attendance);
      } catch (error) {
        console.error('[Attendance Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  async getAttendanceByIdAPI(attendanceId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(`${API_CONSTANTS.attendance}/${attendanceId}`);
        const attendance = response.data;
        resolve(attendance);
      } catch (error) {
        console.error('[Attendance Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  async fetchCheckInMemberAPI() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.attendance);
        const attendance = response.data;
        attendance.data = attendance.data.filter((item) => item.checkOut === null);
        resolve(attendance);
      } catch (error) {
        console.error('[Attendance Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  async createAttendanceAPI(attendanceData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.post(API_CONSTANTS.attendance, attendanceData);
        const attendance = response.data;
        resolve(attendance);
      } catch (error) {
        console.error('[Attendance Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  async updateAttendanceApi(attendanceId, request) {
    try {
      const response = await apiManager.put(`${API_CONSTANTS.attendance}/${attendanceId}`, request);

      return response.data.data;
    } catch (err) {
      console.error('[Attendance Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }
}
export const attendanceApi = new AttendanceApi();
