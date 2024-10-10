import React from "react";
import ygen from "../../assets/ygen.png";
import { useSelector } from "react-redux";
import { MapPinIcon, PhoneArrowDownLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Space, Badge } from "antd";

const TopBar = ({ setIsAddressModalVisible }) => {
    const { logo } = useSelector((state) => state.theme);
    const baseURL = import.meta.env.VITE_BASE_URL;
    return (
        <>
            <div className="flex justify-end sm:justify-between px-5 py-3 relative">
                <Space>
                    <div className="flex gap-1 text-white bg-red-500 px-2 py-1 sm:px-3 rounded-lg transition-transform duration-200 hover:scale-105">
                        <div className="flex items-center">
                            <MapPinIcon className="w-5 h-5"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-[10px] sm:text-[12px]">Change Location</p>
                            <p className="font-semibold w-24 text-[8px] sm:text-[9px] overflow-hidden whitespace-nowrap text-ellipsis">Lahore and some other oh wow</p>
                        </div>
                    </div>
                    <p className="text-white flex  bg-red-500  px-2 py-[9.5px] sm:py-[11px] rounded-lg text-[0.65rem] sm:text-[12px] transition-transform duration-200 hover:scale-105">
                        <PhoneArrowDownLeftIcon  className="h-4 w-4 mr-1"/> <p>03485497976</p> 
                    </p>
                </Space>

                <div className="absolute left-0 top-0 sm:left-[50%] sm:top-[50%]">
                    <img
                        src={logo ? `${baseURL}${logo}` : ygen}
                        alt="Brand Logo"
                        className="mx-auto w-20 h-20 sm:w-24 sm:h-24 object-contain"
                    />
                </div>
                <div className="flex items-center ml-2 cursor-pointer">
                    <Badge count={8} overflowCount={99}>
                        <ShoppingCartIcon className="text-[#EF4444] w-7 sm:w-6 text-[2rem] align-middle" />
                    </Badge>
                </div>
            </div>
            ;
        </>
    );
};

export default TopBar;
