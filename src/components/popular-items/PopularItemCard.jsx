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

// const popularItems = [
//     {
//         id: 1,
//         title: 'Spicy Chicken Burger',
//         description: 'Juicy chicken with our secret spicy sauce',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 12.99,
//         discountedPrice: 9.99,
//     },
//     {
//         id: 2,
//         title: 'Veggie Supreme Pizza',
//         description: 'Loaded with fresh vegetables and cheese',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 15.99,
//         discountedPrice: 13.99,
//     },
//     {
//         id: 3,
//         title: 'Classic Caesar Salad',
//         description: 'Crisp romaine with our homemade dressing',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 8.99,
//         discountedPrice: 7.49,
//     },
//     {
//         id: 4,
//         title: 'Chocolate Lava Cake',
//         description: 'Decadent dessert with a gooey center',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 6.99,
//         discountedPrice: 5.99,
//     },
//     {
//         id: 5,
//         title: 'Chocolate Lava Cake',
//         description: 'Decadent dessert with a gooey center',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 6.99,
//         discountedPrice: 5.99,
//     },
//     {
//         id: 6,
//         title: 'Chocolate Lava Cake',
//         description: 'Decadent dessert with a gooey center',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 6.99,
//         discountedPrice: 5.99,
//     },
//     {
//         id: 7,
//         title: 'Chocolate Lava Cake',
//         description: 'Decadent dessert with a gooey center',
//         image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
//         originalPrice: 6.99,
//         discountedPrice: 5.99,
//     },
// ]

const PopularItemCard = () => {
    const { popularItems, productsData } = useSelector((state) => state.productsData);
    console.log('checking popular items ', popularItems)

    return (
        // the popular items card look so bad becase its too big now we need to make it responsive and smaller to look good and not to take the complete
        // width of the scrreen 4
        <div className="w-full mx-auto px-1 sm:px-2 md:px-20 lg:px-44 pb-8">
            <h2 className="mb-3 sm:mb-6 text-2xl font-bold text-center flex items-center justify-center">
                <FireOutlined className="mr-2 text-red-500" style={{ fontSize: '24px' }} />
                Popular Items
            </h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={4}
                slidesPerView={1.5}
                navigation
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
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                    }
                }}
                className="popular-items-swiper"
            >
                {popularItems.map((item) => {
                    const { afterDiscountPrice, discountPercent } = getDiscounts(item.ProductDetailId, item.Price, productsData.Table13);

                    return (
                        <SwiperSlide key={item.ProductId}>
                            <div className="relative h-[320px] sm:h-[360px] w-full overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={`${baseURL}${item.ProductImage}`}
                                    alt={item.ProductName}
                                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{item.ProductName}</h3>
                                    <p className="mt-1 text-sm line-clamp-2">{item.ProductDescription}</p>
                                    <div className="mt-2 flex items-center">
                                        {discountPercent > 0 ? (
                                            <>
                                                <span className="text-lg font-bold">Rs {afterDiscountPrice.toFixed(2)}</span>
                                                <span className="line-through opacity-75 ml-1 text-sm">Rs {item.Price.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold">Rs {item.Price.toFixed(2)}</span>
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