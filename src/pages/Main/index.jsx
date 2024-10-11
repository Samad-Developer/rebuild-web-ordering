import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWebOrderingSettings } from "../../services/api";
import { getThemeAndSetIntoRedux } from "../../utils/themeHandler";
import { setTheme } from "../../redux/settings/themeSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { AddressModal, Announcement, TopBar, Banner } from "../../components";
import loadingVideo from "../../assets/surprisefood (1).webm";
const MainPage = () => {
  const { banners, topBarText, logo } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(true);
  const [loading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const settingsResponse = await getWebOrderingSettings();
        if (settingsResponse) {
          const themeSettingsObject = getThemeAndSetIntoRedux(
            settingsResponse?.DataSet
          );
          dispatch(setTheme(themeSettingsObject));
        } else {
          alert("dont recieve banner and theme data");
        }
        setIsloading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Announcement />
      <TopBar setIsAddressModalVisible={setIsAddressModalVisible} />
      <Banner />
      <div className="bg-slate-400 w-full p-8"></div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          {/* <LoadingOutlined spin className="text-3xl z-50" /> */}
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
