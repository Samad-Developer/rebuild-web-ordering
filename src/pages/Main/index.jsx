import React, { useState } from "react";
import AddressModal from "../../components/modal/AddressModal";
const MainPage = () => {
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(true);
  return (
    <div className="">
      <AddressModal open={isAddressModalVisible}/>
    </div>
  );
};

export default MainPage;
