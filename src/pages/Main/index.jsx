import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../../components/modal/AddressModal";
import { getWebOrderingSettings } from "../../services/api";
import { getThemeAndSetIntoRedux } from "../../utils/themeHandler";
import { setTheme } from "../../redux/settings/themeSlice";
import TopBar from "../../components/others/topBar";
const MainPage = () => {
  const { banners, topBarText, logo } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsResponse = await getWebOrderingSettings();
        if (settingsResponse) {
          const themeSettingsObject = getThemeAndSetIntoRedux(
            settingsResponse?.DataSet
          );
          dispatch(setTheme(themeSettingsObject));
        } else {
          alert("dont recieve banner and theme data");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <TopBar setIsAddressModalVisible={setIsAddressModalVisible}/>
      <AddressModal open={isAddressModalVisible} />
    </div>
  );
};

export default MainPage;
