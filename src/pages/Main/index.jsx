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
import Scrollspy from 'react-scrollspy'

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
  // for category navigation ..........................................................................................
  const sections = [
    { id: 'section-1', name: 'Section 1', content: 'Content for section 1' },
    { id: 'section-2', name: 'Section 2', content: 'Content for section 2' },
    { id: 'section-3', name: 'Section 3', content: 'Content for section 3' },
    { id: 'section-4', name: 'Section 4', content: 'Content for section 3' },
    { id: 'section-5', name: 'Section 5', content: 'Content for section 3' },
    { id: 'section-6', name: 'Section 6', content: 'Content for section 3' },
    { id: 'section-7', name: 'Section 7', content: 'Content for section 3' },
  ];
  useEffect(() => {
    // Create an IntersectionObserver to track sections
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
        threshold: 0.7, // Trigger when 70% of the section is in view
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      // Clean up the observer on component unmount
      observer.disconnect();
    };
  }, [sections, isManualScroll]);

  // Handle link click to manually set active section and smooth scroll
  const handleLinkClick = (sectionId) => {
    console.log('react here baby dont worry ', sectionId)
    setIsManualScroll(true); // Disable observer updates during manual scroll

    // Smooth scroll to the target section
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setActiveSection(sectionId); // Set the clicked section as active immediately

    // Re-enable observer after the scroll finishes (based on scroll duration)
    setTimeout(() => {
      setIsManualScroll(false);
    }, 800); // Adjust this duration based on scroll animation duration
  };
  // for category navigation .............................................................................................


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

      {/* category navigation link......................................................................................... */}
      <div className="sticky flex justify-center left-0 top-0 bg-white px-2 sm:px-3 pt-2 sm:py-[10px]">
        <ul className="flex gap-2">
          {productsData && productsData.Table1 && productsData.Table1.length > 0 && (
            productsData.Table1.map((category) => (
              <li key={category.CategoryId} className="">
                <CategoryCard
                  category={category}
                  designLayout="leftImage" // 'default', 'topImage', 'leftImage'
                  activeSection={activeSection}
                  handleLinkClick={handleLinkClick}
                />
              </li>
            ))
          )}
        </ul>
      </div>
      {/* category navigation link......................................................................................... */}

      {/* Content */}
      <div className="px-1 space-y-32">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen p-4 bg-gray-200"
          >
            <h2 className="text-3xl font-bold">{section.name}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>




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






