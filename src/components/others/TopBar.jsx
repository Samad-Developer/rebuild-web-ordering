import React from "react";
import ygen from "../../assets/ygen.png";
import { useSelector, useDispatch } from "react-redux";
import { MapPinIcon, PhoneArrowDownLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Space, Badge } from "antd";
import { openModal } from "../../redux/modal/addressModalSlice";

const TopBar = ({ setIsAddressModalVisible }) => {
  const dispatch = useDispatch();
  const { logo } = useSelector((state) => state.theme);
  const { AreaName, BranchName, activeTab } = useSelector((state) => state.addressModal)
  const baseURL = import.meta.env.VITE_BASE_URL;
  const deliveryPickupData = JSON.parse(localStorage.getItem('deliveryPickupData')) || {};
  const storedAreaId = localStorage.getItem('areaId');
  const storedBranchId = localStorage.getItem('branchId');

  return (
    <>
      <div className="flex justify-end sm:justify-between px-5 py-3 relative">
        <div className="flex gap-1 sm:gap-2">
          <div className="flex gap-1 text-white bg-red-500 px-2 py-1 sm:px-3 rounded-lg ">
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5" />
            </div>
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => dispatch(openModal())}
            >
              <p className="font-bold text-[10px] sm:text-[12px]">
                Change Location
              </p>
              <p className="font-semibold w-24 text-[8px] sm:text-[9px] overflow-hidden whitespace-nowrap text-ellipsis">
                {
                activeTab === 'delivery'
                  ? (AreaName || 'Karachi')
                  : (BranchName || 'Karachi')
                }
              </p>
            </div>
          </div>
          <p className="text-white flex items-center bg-red-500  px-2 py-[9.5px] sm:py-[11px] rounded-lg text-[0.65rem] sm:text-[12px] transition-transform duration-200 hover:scale-105">
            <PhoneArrowDownLeftIcon className="h-4 w-4 mr-1" />{" "}
            <p>03485497976</p>
          </p>
        </div>
        {logo && (
          <div className="absolute left-0 top-0 sm:left-[48%] sm:top-[10%] z-10 bg-white rounded-full overflow-hidden">
            <img
              src={`${baseURL}${logo}`}
              alt=""
              className="mx-auto w-20 h-20 sm:w-28 sm:h-28 object-contain"
            />
          </div>
        )}

        <div className="flex relative items-center ml-2 cursor-pointer rounded-full bg-[#EF4444] px-1.5 py-1.5 sm:px-2">
          <span className="text-white absolute left-7 bottom-6 bg-red-500 rounded-full border border-white px-1.5  text-sm font-bold ">
            {'8'}
          </span>
          <ShoppingCartIcon className="text-white w-7 sm:w-6 text-[2rem] align-middle" />
        </div>
      </div>
    </>
  );
};

export default TopBar;
