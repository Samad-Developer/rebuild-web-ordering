// src/services/api.js
import axios from "axios";
import { useSelector } from "react-redux";

// Set up the base URL from environment variables
const API_URL = import.meta.env.VITE_BASE_URL;
const companyId = import.meta.env.VITE_COMPANYID;

// Fetch Web Order Address
export const getWebOrderAddress = async () => {
  try {
    const response = await axios.post(`${API_URL}GetWebOrderAddress`, {
      OperationId: 1,
      CompanyId: companyId,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.errorMessage || "Error fetching address data"
    );
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
    throw new Error(
      error.response?.data?.errorMessage || "Error fetching ordering settings"
    );
  }
};

// Fetch Web products
export const getProducts = async ({ activeTab, CityId, AreaId, BranchId }) => {
  // Check localStorage for areaId and branchId
  const storedAreaId = localStorage.getItem("areaId");
  const storedBranchId = localStorage.getItem("branchId");

  let areaIdToUse;
  let branchIdToUse;

  if (storedAreaId && AreaId) {
    if (storedAreaId === AreaId) {
      areaIdToUse = storedAreaId;
    } else {
      areaIdToUse = AreaId;
    }
  } else if (storedAreaId) {
    areaIdToUse = storedAreaId;
  } else {
    areaIdToUse = AreaId;
  }

  if (storedBranchId && BranchId) {
    if (storedBranchId === BranchId) {
      branchIdToUse = storedBranchId;
    } else {
      branchIdToUse = BranchId;
    }
  } else if (storedBranchId) {
    branchIdToUse = storedBranchId;
  } else {
    branchIdToUse = BranchId;
  }

  // Store in localStorage only if areaIdToUse and branchIdToUse are not null
  if (areaIdToUse !== null) {
    localStorage.setItem("areaId", areaIdToUse);
  }

  if (branchIdToUse !== null) {
    localStorage.setItem("branchId", branchIdToUse);
  }

  if (areaIdToUse || branchIdToUse) {
    console.log("coming to request ");
    try {
      const response = await axios.post(`${API_URL}GetWebOrderAddress`, {
        OperationId: 2,
        CompanyId: companyId,
        IsMobile: false,
        IsWeb: true,
        AreaId: activeTab === "pickup" ? null : areaIdToUse,
        BranchId: activeTab === "delivery" ? null : branchIdToUse,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.errorMessage || "Error fetching ordering settings"
      );
    }
  }
};
