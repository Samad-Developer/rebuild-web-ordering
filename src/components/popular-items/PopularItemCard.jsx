import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { FireOutlined } from '@ant-design/icons';

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const popularItems = [
    {
        id: 1,
        title: 'Spicy Chicken Burger',
        description: 'Juicy chicken with our secret spicy sauce',
        image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
        originalPrice: 12.99,
        discountedPrice: 9.99,
    },
    {
        id: 2,
        title: 'Veggie Supreme Pizza',
        description: 'Loaded with fresh vegetables and cheese',
        image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
        originalPrice: 15.99,
        discountedPrice: 13.99,
    },
    {
        id: 3,
        title: 'Classic Caesar Salad',
        description: 'Crisp romaine with our homemade dressing',
        image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
        originalPrice: 8.99,
        discountedPrice: 7.49,
    },
    {
        id: 4,
        title: 'Chocolate Lava Cake',
        description: 'Decadent dessert with a gooey center',
        image: 'https://www.pizzanation.pk/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1697879560-pic%202.jpg%3Fq%3D10&w=828&q=75',
        originalPrice: 6.99,
        discountedPrice: 5.99,
    },
]

const PopularItemCard = () => {
    return (
        <div className="container mx-auto px-1 sm:px-20 pb-8">
            <h2 className="mb-6 text-2xl font-bold text-center flex items-center justify-center">
                <FireOutlined className="mr-2 text-red-500" style={{ fontSize: '24px' }} />
                Popular Items
            </h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={4}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    }
                }}
                className="popular-items-swiper"
            >
                {popularItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="mt-1 text-sm">{item.description}</p>
                                <div className="mt-2 flex items-center">
                                    <span className="text-lg font-bold">Rs{item.discountedPrice.toFixed(2)}</span>
                                    <span className="ml-2 text-sm line-through opacity-75">Rs{item.originalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}


            </Swiper>
        </div>
    )
}

export default PopularItemCard