// src/services/api.js
import axios from 'axios';

// Set up the base URL from environment variables
const API_URL = import.meta.env.VITE_BASE_URL
const companyId = import.meta.env.VITE_COMPANYID

// Fetch Web Order Address
export const getWebOrderAddress = async () => {
  try {
    const response = await axios.post(`${API_URL}GetWebOrderAddress`, {
      OperationId: 1,
      CompanyId: companyId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.errorMessage || 'Error fetching address data');
  }
};

// Fetch Web Ordering Settings
export const getWebOrderingSettings = async () => {
  try {
    const response = await axios.post(`${API_URL}GetWebOrderingSetting`, {
      OperationId: 1,
      CompanyId: companyId,
      SettingId: null,
      Value: "",
      UserId: null,
      UserIP: "",
      SetupDetailId: null,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.errorMessage || 'Error fetching ordering settings');
  }
};
