import { Badge } from 'flowbite-react';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import { getDaysPercentage, getTotalDaysInYear, getTotalDaysOfYear } from '@/lib/helpers';
import { CircularProgress } from '@nextui-org/react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Dashboard | NIA-Kd",
  description: "NIA-Kd Home",
};

const Dashboard = () => {
  const getPercent = getDaysPercentage( getTotalDaysOfYear(new Date()), getTotalDaysInYear(new Date().getFullYear()))
  return (
    <div className='h-full w-full xs:px-6 sm:px-80 bg-gray-100 overflow-y-auto pb-8'>
      <div className='py-6 w-full pt-16'>
        <div className='flex xs:flex-col sm:flex-row xs:justify-center sm:justify-start sm:items-center xs:space-y-3 sm:space-y-0 sm:space-x-3'>
          <h1 className='text-2xl'>Arc. Jimoh Abdulrazak</h1>
          <Badge className='text-[12px] text-center text-[#0B7A09] rounded-2xl bg-[#E3F1E2] font-normal w-[122px]'>Graduate member</Badge>
        </div>
        <div>
          <h2 className='text-sm'>Membership ID: M3400</h2>
        </div>
      </div>
      <div className='flex xs:flex-col sm:flex-row gap-5 justify-between'>
        <div className='flex xs:flex-col sm:flex-row sm:space-x-4 xs:space-x-0 border bg-white px-8 py-4 rounded-2xl items-center'>
          <div className='flex justify-center items-center h-full xs:pb-4 sm:pb-0 -ml-2'>
            <CircularProgress
              value={getPercent}
              showValueLabel={true} 
              strokeWidth={4}
              classNames={{
                svg: "w-24 h-24 drop-shadow-md",
                indicator: `${getPercent >= 80 ? "stroke-danger" : "stroke-success" }`,
                track: "#BFBFBF",
                value: "text-sm font-semibold text-[#1E1A1C]",
              }}
            />
          </div>
          <div className='flex h-full flex-col gap-4 pb-3'>
            <div>
              <h1 className='text-xl'>Membership Due</h1>
              <span className='text-[13px] text-gray-500'>You have {getTotalDaysInYear(new Date().getFullYear()) - getTotalDaysOfYear(new Date())} days left to renew your membership due</span>
            </div>
            <div className='flex space-x-5 items-center'>
              <button className='px-3 py-1.5 rounded-full text-sm text-white bg-[#241F21]'>Pay now</button>
              <Link href={'/member/tickets'} className='text-sm text-[#1E1A1C]'>View all Invoices</Link>
            </div>
          </div>
        </div>
        <div className='flex xs:justify-center items-center space-x-3 border bg-white px-9 py-6 rounded-2xl divide-x divide-gray-300'>
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
        <div className='flex xs:flex-col sm:flex-row gap-4 h-full'>
          <div className='sm:w-1/2 xs:w-full bg-white rounded-2xl p-4'>
            <div className='h-60 w-full'>
              <h1 className='text-sm font-semibold'>Upcoming events</h1>
              <div className='flex flex-col items-center justify-center h-60 w-full pt-10'>
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
                <span className='text-[13px] text-[#5E5959] py-4'>You have not registered for any event yet</span>
              </div>
            </div>
          </div>
          <div className='sm:w-1/2 xs:w-full bg-white rounded-2xl p-5'>
            <div className='h-60 w-full'>
              <h1 className='text-sm font-semibold'>Recent events</h1>
              <div className='flex flex-col items-center justify-center h-60 w-full pt-10'>
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
                <span className='text-[13px] text-[#5E5959] py-4'>You have not attended any events yet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard