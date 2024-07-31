import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import style from './Home.module.css';
import watch from '../../assets/watch.png';
function Home() {
    return (
        <div className='container' style={{ height: "100vh" }}>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className={style.mainSwiper}

            >
                <SwiperSlide className={style.swiper_slide}>
                    <img src={watch} alt="" />
                    <p>slide</p>
                </SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>Slide 2</SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>Slide 3</SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>Slide 4</SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>Slide 5</SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>Slide 6</SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Home