import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddressModalVisible: false,
  activeTab: "delivery", // default to delivery
  CityId: null,
  AreaId: null,
  BranchId: null,
  AreaName: 'Karachi',
  BranchName: '',
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
      // Reset AreaId and BranchId when switching tabs
      state.AreaId = null;
      state.BranchId = null;
      state.AreaName = '';
      state.BranchName = '';
    },
    setCityId: (state, action) => {
      state.CityId = action.payload;
      state.AreaId = null;
      state.BranchId = null;
      state.AreaName = '';
      state.BranchName = '';
    },
    setAreaId: (state, action) => {
      state.AreaId = action.payload;
      // Update AreaName based on AreaId
      const deliveryPickupData = JSON.parse(localStorage.getItem('deliveryPickupData'));
      if (deliveryPickupData) {
        const area = deliveryPickupData.Table1.find(item => item.AreaId === Number(state.AreaId));
        state.AreaName = area ? area.AreaName : 'Area not found';
      }
    },
    setBranchId: (state, action) => {
      state.BranchId = action.payload;
      // Update BranchName based on BranchId
      const deliveryPickupData = JSON.parse(localStorage.getItem('deliveryPickupData'));
      if (deliveryPickupData) {
        const branch = deliveryPickupData.Table2.find(item => item.BranchId === Number(state.BranchId));
        state.BranchName = branch ? branch.BranchName : 'Branch not found';
      }
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