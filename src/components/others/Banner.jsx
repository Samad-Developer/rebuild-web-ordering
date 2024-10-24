import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination"; // Import Pagination styles

// Import required modules directly from swiper
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { banners } = useSelector((state) => state.theme);

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]} // Add modules here
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {banners?.map((banner, index) => (
          <SwiperSlide key={index} className="w-full">
            {
              banner && (
                <img
                  src={baseURL + banner}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
