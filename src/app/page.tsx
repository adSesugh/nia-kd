import Header from '@/components/header'
import Breadcrumb from '@/components/landing/breadcrumb';
import HomeSlider from '@/components/landing/home-slide';
import Mission from '@/components/landing/mission';
import NIAVision from '@/components/landing/vision';
import { Metadata } from 'next';
import React from 'react'
import styles from '@/styles/home.module.css'
import NIATeam from '@/components/landing/team';
import Showcase from '@/components/landing/showcase';
import NIAFooter from '@/components/footer';
import BlogUpdate from '@/components/landing/blog-update';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Home | NIA-Kd",
  description: "NIA-Kd",
};

const Home = () => {
  return (
    <div className={'w-full'}>
      <Header />
      <HomeSlider />
      <Breadcrumb />
      <div className='px-32 py-6' data-aos="fade-left">
        <Mission />
        <NIAVision />
      </div>
      <div className={styles.videoSection} data-aos="fade-left">

      </div>
      <NIATeam />
      <div className='grid grid-cols-4 h-36 bg-[#F3ECE2] py-6 divide divide-x-2'>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-[48px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-[48px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-[48px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-[48px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
      </div>
      <Showcase />
      <BlogUpdate />
      <NIAFooter />
    </div>
  )
}

export default Home