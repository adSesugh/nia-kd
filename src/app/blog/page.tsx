'use client'

import NIAFooter from '@/components/footer';
import SubHeader from '@/components/sub-header';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link'
import FeaturedImage from '@/assets/blog/feature.svg'
import { ArrowForward, ArrowLeft3, ArrowRight } from 'iconsax-react';

const Blog: NextPage = () => {
  return (
    <div>
      <SubHeader title='Blog' subtitle={''} />
      <div className='w-full h-full py-9 px-20'>
        <h1 className='text-[28px] font-bold'>Featured Update</h1> 
        <div className='flex py-2'>
          <div className='w-8/12'>
            <Image 
              src={FeaturedImage} 
              alt='Featured'
              width={100}
              height={100}
              sizes='100vw'
              className='w-full rounded-2xl'
              style={{
                width: '100%',
                height: 'auto'
              }} 
            />
          </div>
          <div className='w-4/12 px-6'>
            <p className='text-[14px] space-x-2'><span>Oct 20, 2023</span><span className='bg-[#F3ECE2] rounded-md py-1 px-1.5'>5 mins</span></p>
            <h1 className='text-[28px] font-semibold'>The role of nature in Architecture</h1>
            <p className='leading-2 text-[14px] py-2'>The Nigerian Institute of Architects (NIA) was founded on the 1st of April 1960 as an association of independent professional architects with the aims and objectives of...</p>
            <Link href={'/'} className='flex space-x-2 items-center'>
              <span>Read more</span>
              <ArrowRight variant='Outline' size={16} color='black' />
            </Link>
          </div>
        </div>
      </div>
      <NIAFooter />
    </div>
  )
}

export default Blog