import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";

const CatSlider = () => {
  return (
    <div className="homeCatSlider h-80 w-full pl-8 my-2">
      <h3 className="text-[30px] font-[500] pl-3  ">Category</h3>
      <div className="container h-60 pl-3 my-8">
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className=" item py-3 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/bottle.png"></img>
              <h2 className="font-[500]">Dairy</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/bread.png"></img>
              <h2 className="font-[500]">Bakery</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/drinks.png"></img>
              <h2 className="font-[500]">Drinks</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/herb.png"></img>
              <h2 className="font-[500]">Herbs</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/vegetables.png"></img>
              <h2 className="font-[500]">Vegetables</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-slate-100 rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40 bg-slate-100 rounded-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 rounded-sm">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40 w-40  transition">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40  w-40  transition">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col shadow-xl h-40  w-40  transition">
              <img src="/bottle.png"></img>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default CatSlider
