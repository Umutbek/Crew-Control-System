// ServerService.js
import axios from 'axios';
import { getToken } from "../helpers/store";
import { ERRORS } from "../constants/errors";

const _baseApi = 'http://akjol.localhost:8000';

class ServerService {
  static async getJobs() {
    try {
      const response = await axios.get(`${_baseApi}/api/v1/schedules/jobs/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${getToken()}`
        }
      });
      return { hasError: false, data: response.data };
    } catch (error) {
      return {
        hasError: true,
        data: error.response?.data?.detail || ERRORS.SOMETHING_WENT_WRONG
      };
    }
  }
}

export default ServerService;
