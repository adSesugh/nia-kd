import { Clock, Timer, Timer1 } from 'iconsax-react';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'

export const metadata: Metadata = {
  title: "Dashboard | NIA-Kd",
  description: "NIA-Kd Home",
};

const Dashboard = () => {
  return (
    <div className='h-full w-full px-80 bg-gray-100'>
      <div className='flex justify-between items-center py-6 w-full pt-16'>
        <div className='flex flex-col justify-center'>
          <h1 className='text-[32px]'><span className='text-gray-300'>Hello,&nbsp;</span><span className='font-medium'>Jimoh</span></h1>
          <div className='flex items-center space-x-2 text-gray-600'>
            <div className='flex space-x-2 items-center text-sm'>
              <Timer1 variant='Outline' color='gray' size={16} />
              <span>Fri, Dec 27 2023</span>
            </div>
            <div className='h-1 w-1 rounded-full bg-gray-300' />
            <span className='text-sm'>It’s a good day to be back here</span>
          </div>
        </div>
        <div className='flex space-x-2 items-center border rounded-full bg-white px-2 py-2'>
          <Image
            alt='Badge'
            src={'/assets/badge.svg'}
            width={36}
            height={36}
            sizes='100vw'
            style={{
              width: '20%',
              height: 'auto'
            }} 
          />
          <span className='text-sm'>Graduate Member</span>
        </div>
      </div>
      <div className='flex pt-2 gap-6'>
        <div className='flex space-x-3 border bg-white px-6 py-4 rounded-2xl'>
          <div>Part a circle</div>
          <div className='flex flex-col gap-4'>
            <div>
              <h1 className='text-2xl'>Membership Due</h1>
              <span className='text-sm text-gray-500'>You have {28} days left to renew your membership due</span>
            </div>
            <button className='px-3 py-2 rounded-full text-white bg-[#241F21] w-28'>Pay now</button>
          </div>
        </div>
        <div className='flex items-center space-x-3 border bg-white px-6 py-6 rounded-2xl divide-x divide-gray-300'>
          <div className='pr-6'>
            <h1 className='text-[#545454] text-sm'>Events attended</h1>
            <span className='text-[40px] font-semibold text-[#1E1A1C]'>5</span>
          </div>
          <div className='pl-16'>
            <h1 className='text-[#545454] text-sm'>Certificates</h1>
            <span className='text-[40px] font-semibold text-[#1E1A1C]'>2</span>
          </div>
        </div>
      </div>
      <div className='pt-8 w-full'>
        <h1 className='text-2xl font-semibold'>My upcoming events</h1>
        <div className='flex flex-col items-center justify-center w-full pt-10'>
          <Image
            className=''
            alt='no-search-found'
            src={'/assets/search.svg'}
            width={100}
            height={100}
            sizes='60vw'
            style={{
              width: '10%',
              height: 'auto'
            }} 
          />
          <span>No event found</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard