import React, { useState, useEffect } from "react";
import { setProductsData, setProductsLoading } from "../../redux/productsData/productsSlice";
import { toggleModal, openModal, closeModal } from "../../redux/modal/addressModalSlice";
import { AddressModal, Announcement, TopBar, Banner } from "../../components";
import { getWebOrderingSettings, getProducts } from "../../services/api";
import { getThemeAndSetIntoRedux } from "../../utils/themeHandler";
import { setTheme } from "../../redux/themeSettings/themeSlice";
import loadingVideo from "../../assets/surprisefood (1).webm";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

const MainPage = () => {
  const dispatch = useDispatch();
  const { activeTab, CityId, AreaId, BranchId } = useSelector((state) => state.addressModal);
  const { productsData, productsLoading } = useSelector((state) => state.productsData);
  const [bannersAndThemeLoading, setBannersAndThemeLoading] = useState(true);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(true);

  console.log('checking products data ', productsData)
  useEffect(() => {
    const getSettingsData = async () => {
      try {
        setBannersAndThemeLoading(true);
        const settingsResponse = await getWebOrderingSettings();
        if (settingsResponse) {
          const themeSettingsObject = getThemeAndSetIntoRedux(
            settingsResponse?.DataSet
          );
          dispatch(setTheme(themeSettingsObject));
        } else {
          alert("dont recieve banner and theme data");
        }
        setBannersAndThemeLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    const getProductsData = async () => {
      try {
        dispatch(setProductsLoading(true))
        const response = await getProducts({ activeTab, CityId, AreaId, BranchId });
        if(!response?.DataSet.Table[0]?.Error_Message){
          dispatch(setProductsData(response?.DataSet.Table[0]?.Error_Message))
          dispatch(setProductsLoading(false));
        }else {
          alert(response?.DataSet.Table[0]?.Error_Message)
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getSettingsData();
    const storedAreaId = localStorage.getItem("areaId");
    const storedBranchId = localStorage.getItem("branchId");
    // Check if either storedAreaId or storedBranchId exists
    if (storedAreaId || storedBranchId) {
      dispatch(closeModal());
    } else {
      dispatch(openModal());
    }
    getProductsData();
  }, []);

  return (
    <div className="">
      <Announcement />
      <TopBar setIsAddressModalVisible={setIsAddressModalVisible} />
      <Banner />
      {productsLoading && (
        <div className="bg-slate-700 w-full p-6">Loading Products </div>
      ) }

      {bannersAndThemeLoading ? (
        <div className="flex justify-center items-center h-96">
          <video autoPlay loop muted className="w-36 h-36 z-50">
            <source src={loadingVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <AddressModal
          open={isAddressModalVisible}
          setIsAddressModalVisible={setIsAddressModalVisible}
        />
      )}

    </div>
  );
};

export default MainPage;
