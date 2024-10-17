import React, { useState, useEffect } from "react";
import { setProductsData, setProductsLoading } from "../../redux/productsData/productsSlice";
import { toggleModal, openModal, closeModal } from "../../redux/modal/addressModalSlice";
import { AddressModal, Announcement, TopBar, Banner, CategoryCard } from "../../components";
import { getWebOrderingSettings, getProducts } from "../../services/api";
import { getThemeAndSetIntoRedux } from "../../utils/themeHandler";
import { setTheme } from "../../redux/themeSettings/themeSlice";
import loadingVideo from "../../assets/surprisefood (1).webm";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from "antd";

const MainPage = () => {
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BASE_URL
  const { activeTab, CityId, AreaId, BranchId } = useSelector((state) => state.addressModal);
  const { productsData, productsLoading } = useSelector((state) => state.productsData);
  const [bannersAndThemeLoading, setBannersAndThemeLoading] = useState(true);

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
            toast.info("dont recieve banner and theme data");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setBannersAndThemeLoading(false);
      }
    };

    const getProductsData = async () => {
      try {
          dispatch(setProductsLoading(true));
          const response = await getProducts({ activeTab, CityId, AreaId, BranchId });
        if (!response?.DataSet.Table[0]?.Error_Message) {
          dispatch(setProductsData(response?.DataSet));
        } else {
          toast.error(response?.DataSet.Table[0]?.Error_Message);
          dispatch(openModal());
        }
      } catch (error) {
        console.error(error.message);
        toast.error("An error occurred while fetching products."); // Notify user of the error
      } finally {
        dispatch(setProductsLoading(false)); // Ensure loading state is reset
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
      <ToastContainer position="top-center" autoClose={3000} />
      <Announcement />
      <TopBar />
      <Banner />
      {productsLoading && (
        <div className="bg-slate-700 w-full p-6">Skeleton here </div>
      )}
      <div className="p-5 sticky top-0">

      </div>


      <div className="p-32 bg-black"></div>
      <div className="p-32 bg-black"></div>
      <div className="p-32 bg-black"></div>
      <div className="p-32 bg-black"></div>
      <div className="p-32 bg-black"></div>
      <div className="p-32 bg-black"></div>
      <div className="p-32 bg-black"></div>


      {bannersAndThemeLoading ? (
        <div className="flex justify-center items-center h-96">
          <video autoPlay loop muted className="w-36 h-36 z-50">
            <source src={loadingVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <AddressModal />
      )}
    </div>
  );
};

export default MainPage;






