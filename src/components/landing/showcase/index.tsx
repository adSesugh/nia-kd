'use client'

import React, {  } from 'react'
import styles from '@/styles/home.module.css'
import ShowcaseCard from './ShowcaseCard'
import { ArrowLeft, ArrowRight } from 'iconsax-react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";


const Showcase = () => {
  
  return (
    <div className={styles.showcase}>
        <h1>Showcase</h1>
        <div>
            <h2>One platform to unite Us all.</h2>
        </div>
        <div className='gap-8 overflow-hidden'>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Pagination, Autoplay, Navigation]}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
          >
            <SwiperSlide>
              <ShowcaseCard photoUrl={'/assets/showcase/1.jpeg'} />
            </SwiperSlide>
            <SwiperSlide>
              <ShowcaseCard photoUrl={'/assets/showcase/2.jpeg'} />
            </SwiperSlide>
            <SwiperSlide>
              <ShowcaseCard photoUrl={'/assets/showcase/3.jpeg'} />
            </SwiperSlide>
            <SwiperSlide>
              <ShowcaseCard photoUrl={'/assets/showcase/1.jpeg'} />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='flex my-12 gap-3 justify-center items-center text-white'>
          <button className='flex justify-center prev items-center h-12 w-12 rounded-full border border-[#F3ECE2]'>
            <ArrowLeft variant='Outline' size={24} color='#F3ECE2' />
          </button>
          <button className='flex justify-center items-center next h-12 w-12 rounded-full border border-[#F3ECE2]'>
            <ArrowRight variant='Outline' size={24} color='#F3ECE2' />
          </button>
        </div>
    </div>
  )
}

export default Showcase