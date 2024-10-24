import React, { useState, useEffect } from "react";
import { openModal, closeModal, setActiveTab, setCityId, setAreaId, setBranchId } from "../../redux/modal/addressModalSlice";
import { setProductsData, setProductsLoading, setPopularItems } from "../../redux/productsData/productsSlice";
import { TruckIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { getWebOrderAddress, getProducts } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import { toast } from "react-toastify";
const { Option } = Select;

const AddressModal = () => {
  const dispatch = useDispatch();
  const brandName = import.meta.env.VITE_BRANDNAME;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { logo } = useSelector((state) => state.theme);
  const { isAddressModalVisible, activeTab, CityId, AreaId, BranchId } = useSelector((state) => state.addressModal);
  const [addressLoading, setAddressloading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [deliveryPickupData, setDeliveryPickupData] = useState({ cities: [], areas: [], branches: [] });
  const [modalData, setModalData] = useState({ CityId: null, AreaId: null, BranchId: null });

  // Validation logic
  const isDeliveryValid = activeTab === "delivery" && modalData.CityId && modalData.AreaId;
  const isPickupValid = activeTab === "pickup" && modalData.CityId && modalData.BranchId;

  // Disable the confirm button if the validation fails
  const isConfirmDisabled = activeTab === "delivery" ? !isDeliveryValid : !isPickupValid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAddressloading(true);
        const addressResponse = await getWebOrderAddress();
        if (addressResponse) {
          const newData = {
            cities: addressResponse.DataSet.Table,
            areas: addressResponse.DataSet.Table1,
            branches: addressResponse.DataSet.Table2,
          };
          // Set the delivery pickup data
          setDeliveryPickupData(newData);
          localStorage.setItem("deliveryPickupData", JSON.stringify(addressResponse?.DataSet));
        } else {
          alert("Dont recieve Address response");
        }
        setAddressloading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal
        open={isAddressModalVisible}
        // onCancel={() => dispatch(closeModal())}
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
          {addressLoading ? (
            <LoadingOutlined spin className="text-2xl" />
          ) : (
            <img
              src={logo && `${baseURL}${logo}`}
              alt="Brand Logo"
              className="mx-auto w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          )}

          <h3 className="text-xl font-semibold mb-2">
            {brandName ? brandName : "Brand Name"}
          </h3>
        </div>

        {/* Custom Sliding Tabs */}
        <div className="relative w-[55%] sm:w-[45%]  max-w-lg mx-auto bg-slate-200 p-1 rounded-full">
          {/* Tabs */}
          <div className="flex justify-center relative">
            <button className={`py-2 px-1 w-full text-sm font-semibold relative z-10 text-center ${activeTab === "delivery" ? "text-white" : "text-black"}`}
              onClick={() => {
                dispatch(setActiveTab("delivery"))
                localStorage.setItem("lastSelectedTab", "delivery")
              }} // Set activeTab in Redux
            >
              <p className="flex items-center justify-center text-[12px] sm:text-sm">
                <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Delivery
              </p>
            </button>
            <button
              className={`py-2 px-1 w-full text-sm font-semibold relative z-10 ${activeTab === "pickup" ? "text-white" : "text-black"
                }`}
              onClick={() => {
                dispatch(setActiveTab("pickup"))
                localStorage.setItem("lastSelectedTab", "pickup")
              }} // Set activeTab in Redux
            >
              <p className="flex items-center justify-center text-[12px] sm:text-sm">
                <ShoppingBagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Pickup
              </p>
            </button>

            {/* Background sliding indicator */}
            <div
              className={`absolute top-0 left-0 h-full bg-[#CF0E08] transition-transform duration-300 ${activeTab === "delivery" ? "translate-x-0" : "translate-x-full"
                }`}
              style={{ width: "50%", borderRadius: "30px" }}
            ></div>
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-3">
          {activeTab === "delivery" ? (
            <div>
              <div className="mb-3">
                <Select
                  showSearch
                  placeholder={"Please Select City"}
                  className="w-full h-10"
                  optionFilterProp="children"
                  value={modalData.CityId}
                  onChange={(e) => {
                    setIsFiltering(true);
                    setModalData({ ...modalData, CityId: e });
                    dispatch(setCityId(e));
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
                <div className="flex justify-center mt-3">
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
                        dispatch(setAreaId(e));
                        setModalData({ ...modalData, AreaId: e });
                        localStorage.setItem('areaId', e)
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
                            <Option key={i} value={x.AreaId} >
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
              <div className="mb-3">
                <Select
                  showSearch
                  placeholder={"Please Select City"}
                  className="w-full h-10"
                  optionFilterProp="children"
                  value={modalData.CityId}
                  onChange={(e) => {
                    setIsFiltering(true);
                    setModalData({ ...modalData, CityId: e });
                    dispatch(setCityId(e));
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
                <div className="flex justify-center mt-3">
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
                      onChange={(e) => {
                        dispatch(setBranchId(e));
                        setModalData({ ...modalData, BranchId: e });
                        localStorage.setItem('branchId', e)
                      }}
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
          className={`mt-3 h-10 w-full text-[16px] rounded-lg bg-[#CF0E08] text-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-[#be3f3f] focus:outline-none focus:ring-2 focus:ring-[#F3C3C1] ${isConfirmDisabled ? "cursor-not-allowed" : ""
            }`}
          disabled={isConfirmDisabled}
          onClick={async () => {
            dispatch(closeModal());
            try {
              dispatch(setProductsLoading(true));
              const response = await getProducts({ activeTab, CityId, AreaId, BranchId });

              if (!response?.DataSet.Table[0]?.Error_Message) {
                dispatch(setProductsData(response?.DataSet));
                const popularItems = response?.DataSet.Table.filter((item) => item.IsPromotion === true);
                dispatch(setPopularItems(popularItems));
              } else {
                toast.error(response?.DataSet.Table[0]?.Error_Message);
                dispatch(openModal())
              }
            } catch (error) {
              console.error(error.message);
              toast.error("An error occurred while fetching products.");
            } finally {
              dispatch(setProductsLoading(false));
            }



          }}
        >
          {addressLoading ? (
            <LoadingOutlined spin className="text-2xl" />
          ) : (
            "Confirm"
          )}
        </button>

      </Modal>

    </>
  );
};

export default AddressModal;
