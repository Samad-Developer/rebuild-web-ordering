import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import biryaniWala from "../../assets/biryaniWala.jpeg";
import { getWebOrderAddress, getWebOrderingSettings } from "../../services/api";
const { Option } = Select;

const AddressModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("delivery");
  const [isFiltering, setIsFiltering] = useState(false);

  const [areas, setAreas] = useState([]);
  const [branches, setBranches] = useState([]);

  // .....
  const [deliveryPickupData, setDeliveryPickupData] = useState({
    cities: [],
    areas: [],
    branches: [],
  });
  const [modalData, setModalData] = useState({
    CityId: null,
    AreaId: null,
    BranchId: null,
  });
  // ......

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressResponse = await getWebOrderAddress();
        const settingsResponse = await getWebOrderingSettings();
        if (addressResponse) {
          // Set the delivery pickup data

          const newData = {
            cities: addressResponse.DataSet.Table,
            areas: addressResponse.DataSet.Table1,
            branches: addressResponse.DataSet.Table2,
          };

          setDeliveryPickupData(newData);
        }
        console.log("now may it work ", deliveryPickupData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    setLoadingAreas(true);

    // Simulate async data fetching
    setTimeout(() => {
      if (city) {
        setAreas(["Area 1", "Area 2", "Area 3"]);
        setBranches(["Branch 1", "Branch 2", "Branch 3"]);
      }
      setLoadingAreas(false);
    }, 2000);
  };

  return (
    <Modal
      open={open}
      //   onCancel={onClose}
      closable={true}
      footer={null}
      centered
      width="96%"
      style={{
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      {/* Logo */}
      <div className="text-center mb-2">
        <img src={biryaniWala} alt="Brand Logo" className="mx-auto w-24 h-24" />
        <h3 className="text-xl font-bold mb-2">Biryani Wala</h3>
      </div>

      {/* Custom Sliding Tabs */}
      <div className="relative w-[60%]  max-w-lg mx-auto bg-slate-200 p-1 rounded-full">
        {/* Tabs */}
        <div className="flex justify-center relative">
          <button
            className={`py-2 px-2 w-full text-sm font-semibold relative z-10 text-center ${
              activeTab === "delivery" ? "text-white" : "text-black"
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            Delivery
          </button>
          <button
            className={`py-2 px-2 w-full text-sm font-semibold relative z-10 ${
              activeTab === "pickup" ? "text-white" : "text-black"
            }`}
            onClick={() => setActiveTab("pickup")}
          >
            Pickup
          </button>

          {/* Background sliding indicator */}
          <div
            className={`absolute top-0 left-0 h-full bg-blue-600 transition-transform duration-300 ${
              activeTab === "delivery" ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ width: "50%", borderRadius: "30px" }}
          ></div>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-3">
        {activeTab === "delivery" ? (
          <div>
            <div className="mb-4">
              <Select
                showSearch
                placeholder={"Please Select Your City"}
                className="w-full h-10"
                optionFilterProp="children"
                value={modalData.CityId}
                onChange={(e) => {
                  setIsFiltering(true);
                  setModalData({ ...modalData, CityId: e });
                  setTimeout(() => {
                    setIsFiltering(false);
                  }, 1000);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {deliveryPickupData.cities &&
                  deliveryPickupData.cities.map((x, i) => (
                    <Option key={i} value={x.CityId}>
                      {x.CityName}
                    </Option>
                  ))}
              </Select>
            </div>

            {isFiltering ? (
              <div className="flex justify-center mt-4">
                <LoadingOutlined spin className="text-2xl" />
              </div>
            ) : (
              modalData?.CityId && (
                <div className="mb-4">
                  <Select
                    showSearch
                    placeholder={"Please Select Area"}
                    className="w-full h-10"
                    optionFilterProp="children"
                    value={modalData.AreaId}
                    onChange={(e) => {
                        setModalData({ ...modalData, AreaId: e })
                        console.log('checking what is e actually ', e)
                        alert('hai')
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {deliveryPickupData.areas &&
                      deliveryPickupData.areas
                        .filter((x) => x.CityId === modalData.CityId)
                        .map((x, i) => (
                          <Option key={i} value={x.AreaId}>
                            {x.AreaName}
                          </Option>
                        ))}
                  </Select>
                </div>
              )
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <Select
                showSearch
                placeholder={"Please Select City"}
                className="w-full h-10"
                optionFilterProp="children"
                value={modalData.CityId}
                onChange={(e) => {
                  setIsFiltering(true);
                  setModalData({ ...modalData, CityId: e });
                  setTimeout(() => {
                    setIsFiltering(false);
                  }, 1000);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {deliveryPickupData.cities &&
                  deliveryPickupData.cities.map((x, i) => (
                    <Option key={i} value={x.CityId}>
                      {x.CityName}
                    </Option>
                  ))}
              </Select>
            </div>
            {isFiltering ? (
              <div className="flex justify-center mt-4">
                <LoadingOutlined spin className="text-2xl" />
              </div>
            ) : (
              modalData?.CityId && (
                <div className="mb-4">
                  <Select
                    showSearch
                    placeholder={"Please Select Branch"}
                    className="w-full h-10"
                    optionFilterProp="children"
                    value={modalData.BranchId}
                    onChange={(e) =>
                      setModalData({ ...modalData, BranchId: e })
                      
                    }
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {deliveryPickupData.branches &&
                      deliveryPickupData.branches
                        .filter((x) => x.CityId === modalData.CityId)
                        .map((x, i) => (
                          <Option key={i} value={x.BranchId}>
                            {x.BranchName}
                          </Option>
                        ))}
                  </Select>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Full-width confirm button */}
      <button
        type="button"
        className="mt-3 h-10 w-full text-[16px] rounded-lg bg-blue-600 text-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => console.log("Confirmed")}
      >
        Confirm
      </button>
    </Modal>
  );
};

export default AddressModal;
