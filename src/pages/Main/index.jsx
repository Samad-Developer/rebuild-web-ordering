import React, { useState, useEffect } from "react";
import { setProductsData, setProductsLoading, setPopularItems } from "../../redux/productsData/productsSlice";
import { toggleModal, openModal, closeModal } from "../../redux/modal/addressModalSlice";
import { AddressModal, Announcement, TopBar, Banner, CategoryCard, Search, PopularItemCard, Skeleton, ItemCard } from "../../components";
import { getWebOrderingSettings, getProducts } from "../../services/api";
import { getThemeAndSetIntoRedux } from "../../utils/themeHandler";
import { setTheme } from "../../redux/themeSettings/themeSlice";
import loadingVideo from "../../assets/surprisefood (1).webm";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col } from "antd";
import clsx from "clsx";

const MainPage = () => {
  const dispatch = useDispatch();

  // for category navigation ...............
  const [activeSection, setActiveSection] = useState('');
  const [isManualScroll, setIsManualScroll] = useState(false); // Track if it's a manual click scroll
  // for category navigation ...............

  const baseURL = import.meta.env.VITE_BASE_URL
  const { activeTab, CityId, AreaId, BranchId } = useSelector((state) => state.addressModal);
  const { productsData, productsLoading } = useSelector((state) => state.productsData);
  const [bannersAndThemeLoading, setBannersAndThemeLoading] = useState(true);
  console.log('checking category data ', productsData)
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('checking the filtered data ', filteredData)
  }
  // Filter the data based on the search term
  const filteredData = searchTerm
    ? productsData?.Table2.filter(product =>
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : productsData;

  // for category navigation ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isManualScroll) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }
      },
      {
        threshold: 0.7,
      }
    );
    // sections.forEach((section) => {
    //   const sectionElement = document.getElementById(section.id);
    //   if (sectionElement) {
    //     observer.observe(sectionElement);
    //   }
    // });

    return () => {
      observer.disconnect();
    };
  }, [isManualScroll]);

  const handleLinkClick = (sectionId) => {
    setIsManualScroll(true);
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveSection(sectionId);
    setTimeout(() => {
      setIsManualScroll(false);
    }, 800);
  };
  // for category navigation ---------------------------------------------------------------------------------------------------------

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
          // insde response.dataset there is Table which contain object now filter it based on ispromotion
          const popularItems = response?.DataSet.Table.filter((item) => item.IsPromotion === true);
          dispatch(setPopularItems(popularItems));
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

  const categoryLinksStyle = 'default';


  return (
    <div className="">
      {
        productsLoading ? (
          <Skeleton />
        ) :
          <>
            <ToastContainer position="top-center" autoClose={3000} />
            <Announcement />
            <TopBar />
            <Banner />

            {/* category navigation link--------------------------------------------------------------------------------------------------------------------------------- */}
            <div className={clsx('sticky flex sm:justify-center px-1 left-0 top-0 bg-red-500 overflow-x-auto custom-scrollbar z-10', {
              'py-[8px] ': categoryLinksStyle === 'default',
              'py-1': categoryLinksStyle === 'topImage',
              'py-2 ': categoryLinksStyle === 'leftImage',
            })}>
              <ul className={clsx('flex', {
                'gap-1 sm:gap-3': categoryLinksStyle === 'default',
                'gap-2 sm:gap-2': categoryLinksStyle === 'leftImage',
              })}>
                {productsData && productsData.Table1 && productsData.Table1.length > 0 && (
                  productsData.Table1.map((category) => (
                    <li key={category.CategoryId} className="">
                      <CategoryCard
                        category={category}
                        designLayout={categoryLinksStyle} // 'default', 'topImage', 'leftImage'
                        activeSection={activeSection}
                        handleLinkClick={handleLinkClick}
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* category navigation link--------------------------------------------------------------------------------------------------------------------------------- */}

            {/* searching input box here--------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="pt-5 sm:pt-10 bg-white flex items-center justify-center">
              <Search
                searchTerm={searchTerm}
                onSearch={handleSearch}
                filteredData={filteredData}
              />
            </div>
            {/* searching input box here--------------------------------------------------------------------------------------------------------------------------------- */}

            {/* popular items here --------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="w-full px-2 sm:px-8 mx-auto md:px-16 lg:px-24 xl:px-[10rem] mt-6 sm:mt-12">
              <PopularItemCard />
            </div>
            {/* popular items here --------------------------------------------------------------------------------------------------------------------------------------- */}

            {/* Category wise items here --------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="mx-auto max-w-2xl px-2 sm:px-6 lg:px-8 lg:max-w-[78rem] mt-6 sm:mt-12">
              {productsData && productsData?.Table1?.map((category) => (
                // show the category name if avaiable if not than show the category name center aligned
                <div className="mb-4 flex justify-center">
                  {
                    category?.CategoryImage ? (
                      // show responsvive banner image here which is category image and have a responsve hieght and width the hieght need to be shown like banner not bigger
                      category?.CategoryImage && <img src={`${baseURL}${category.CategoryImage}`} alt={category.CategoryName} className="h-auto w-full overflow-hidden rounded-lg  sm:rounded-2xl" />
                    ) : (
                      <h2 className="text-2xl font-medium tracking-tight text-gray-900">{category.CategoryName}</h2>
                    )
                  }
                </div>  
              ))}
            </div>
            {/* Category wise items here --------------------------------------------------------------------------------------------------------------------------------------- */}


            <div className="h-screen w-full bg-black"></div>
            <div className="h-screen w-full bg-green-600"></div>
            <div className="h-screen w-full"></div>
            <AddressModal />
          </>
      }
    </div>
  );
};

export default MainPage;






