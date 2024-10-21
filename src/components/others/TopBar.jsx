import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapPinIcon,
  PhoneIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { openModal } from "../../redux/modal/addressModalSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const { logo } = useSelector((state) => state.theme);
  const { activeTab, AreaName, BranchName } = useSelector(
    (state) => state.addressModal
  );
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <div className="flex justify-end items-center sm:justify-between px-3 sm:px-5 py-2 sm:py-3 relative">
        <div className="flex gap-1 sm:gap-2">
          <div className="flex h-[38px] sm:h-10 gap-1 text-white bg-red-500 px-2  sm:px-3 rounded-full transition-transform duration-200 hover:scale-105">
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 " />
            </div>
            <div
              className="flex flex-col justify-center cursor-pointer h-auto"
              onClick={() => dispatch(openModal())}
            >
              <p className="font-bold text-[10px] sm:text-[12px]">
                {AreaName == "" && BranchName == ""
                  ? "Select Address"
                  : "Change Location"}
              </p>
              <p className="font-semibold w-24 text-[8px] sm:text-[9px] overflow-hidden whitespace-nowrap text-ellipsis">
                {activeTab === "delivery" ? AreaName : BranchName}
              </p>
            </div>
          </div>
          <p className="text-red-500 flex items-center bg-red-50 h-[38px] sm:h-10 px-2.5 sm:px-4 py-[9.5px] sm:py-[11px] rounded-full text-[0.65rem] sm:text-[12px] transition-transform duration-200 hover:scale-105">
            <PhoneIcon className="h-4 w-4 mr-1 animate-rotate" />{" "}
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

        <div className="flex relative items-center ml-2 cursor-pointer rounded-full bg-red-500 px-1.5 py-1.5 sm:px-2 sm:py-2">          
          <span className="text-white absolute left-7 bottom-6 bg-red-500 rounded-full border border-white px-1.5  text-sm font-bold ">
            {"8"}
          </span>
          <ShoppingBagIcon className="text-white w-7 sm:w-6 text-[2rem] align-middle" />
        </div>
      </div>
    </>
  );
};

export default TopBar;
