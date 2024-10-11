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
      <div className='sm:px-32 xs:px-0 py-6' data-aos="fade-left">
        <Mission />
        <NIAVision />
      </div>
      <div className='w-full bg-[#F3ECE2]'>
        <div className='pt-16 flex items-center justify-center w-full'>
          <h1 className='font-semibold text-4xl'>Out Impact in numbers</h1>
        </div>
        <div className='grid sm:grid-cols-4 xs:grid-cols-2 sm:h-48 xs:h-48 py-6 mb-16 divide divide-x-2'>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
        </div>
      </div>
      <div className={`sm:px-32 xs:px-6 py-8`} data-aos="fade-left">
        <p className='text-center mb-6'><span className='text-3xl font-semibold'>Event Highlight</span></p>
        <iframe className='w-full sm:h-[600px] xs:h-[400px] rounded-2xl'
          src="https://www.youtube.com/embed/N2z5wgeouNA?si=Whe8_wDbPS1J2fKV" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
        </iframe>
      </div>
      <NIATeam />
      <Showcase />
      <BlogUpdate />
      <NIAFooter />
    </div>
  )
}

export default Home