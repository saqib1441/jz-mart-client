"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css/bundle";
import { Pagination } from "swiper/modules";
import Image from "next/image";

// Imports
import HeaderImg1 from "@/assets/header/header-1.png";
import HeaderImg2 from "@/assets/header/header-2.png";
import HeaderImg3 from "@/assets/header/header-3.png";

const HeaderSwiper: FC = () => {
  return (
    <main>
      <div className="wrapper mt-10">
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={50}
          className="h-[460px]"
        >
          <SwiperSlide>
            <div>
              <Image
                src={HeaderImg1}
                className="h-[460px]"
                alt="jz-mart"
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image src={HeaderImg2} alt="jz-mart" priority />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image src={HeaderImg3} alt="jz-mart" priority />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
};

export default HeaderSwiper;
