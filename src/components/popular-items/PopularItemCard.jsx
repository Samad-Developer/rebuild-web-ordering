import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { FireOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import getDiscounts from '../../utils/getDiscounts';
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const baseURL = import.meta.env.VITE_BASE_URL;

const PopularItemCard = () => {
    const { popularItems, productsData } = useSelector((state) => state.productsData);

    return (
        // the popular items card look so bad becase its too big now we need to make it responsive and smaller to look good and not to take the complete
        // width of the scrreen 4
        <div>
            <h2 className=" mb-1 sm:mb-2  text-xl sm:text-[29px] font-semibold text-center flex items-center justify-center">
                <FireOutlined className="mr-2 text-red-500" style={{ fontSize: '24px' }} />
                Popular Items
            </h2>
            <p className="mb-2 sm:mb-4 text-center text-sm sm:text-base text-gray-600">
                Check out our best-selling dishes, loved by all!
            </p>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={4}
                slidesPerView={1.7}
                // navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                    }
                }}
                className="popular-items-swiper md:px-2 lg:px-4"
            >
                {popularItems && popularItems?.map((item) => {
                    const { afterDiscountPrice, discountPercent } = getDiscounts(item.ProductDetailId, item.Price, productsData.Table13);
                    return (
                        <SwiperSlide key={item.ProductId}>
                            <div className="relative h-auto w-full overflow-hidden rounded-xl shadow-lg">
                                {
                                    item?.ProductImage && (
                                        <img
                                            loading='lazy'
                                            src={`${baseURL}${item.ProductImage}`}
                                            alt={item.ProductName}
                                            className="w-full h-64 lg:h-80  object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                        />
                                    )
                                }
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                                    <h3 className="text-base  font-bold line-clamp-2">{item.ProductName}</h3>
                                    {/* <p className="mt-1 text-sm line-clamp-2 opacity-90">{item.ProductDescription}</p> */}
                                    <div className="mt-1 inline-flex bg-white text-black px-2 items-center rounded-md ">
                                        {discountPercent > 0 ? (
                                            <>
                                                <span className="text-base  font-semibold">Rs. {Math.round(afterDiscountPrice)}</span>
                                                <span className="line-through opacity-75 ml-1 text-sm">Rs {item.Price}</span>
                                            </>
                                        ) : (
                                            <span className="text-base  font-semibold">Rs. {item.Price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default PopularItemCard