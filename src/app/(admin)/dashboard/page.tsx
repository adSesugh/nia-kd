import { Metadata } from 'next';
import React from 'react'
import PageHeader from '../TitleHeader';
import { PRIMARY_TWO } from '@/constant/Colors';

export const metadata: Metadata = {
  title: "Dashboard | NIA-Kd",
  description: "NIA-Kd Home",
};

const Dashboard = () => {
  return (
    <div className='sm:px-12 xs:px-4 overflow-y-auto sm:pt-14 xs:pt-2'>
      <h1 className={`text-[${PRIMARY_TWO}] sm:text-xl xs:text-lg  font-semibold`}>Good afternoon, Jimoh</h1>
    </div>
  )
}

export default Dashboard