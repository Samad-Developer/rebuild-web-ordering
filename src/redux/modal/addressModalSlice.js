import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddressModalVisible: false,
  activeTab: "delivery", // default to delivery
  CityId: null,
  AreaId: null,
  BranchId: null,
};

const addressModalSlice = createSlice({
  name: "addressModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isAddressModalVisible = true;
    },
    closeModal: (state) => {
      state.isAddressModalVisible = false;
    },
    toggleModal: (state) => {
      state.isAddressModalVisible = !state.isAddressModalVisible;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setCityId: (state, action) => {
      state.CityId = action.payload;
      state.AreaId = null;
      state.BranchId = null;
    },
    setAreaId: (state, action) => {
      state.AreaId = action.payload;
    },
    setBranchId: (state, action) => {
      state.BranchId = action.payload;
    },
  },
});

// Export actions
export const {
  openModal,
  closeModal,
  toggleModal,
  setActiveTab,
  setCityId,
  setAreaId,
  setBranchId,
} = addressModalSlice.actions;

// Export reducer
export default addressModalSlice.reducer;
