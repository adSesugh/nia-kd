import { Metadata } from 'next';
import React from 'react'
import EventCard from '../events/EventCard';

export const metadata: Metadata = {
  title: "Tickets | NIA-Kd",
  description: "NIA-Kd Home",
};

const page = () => {
  return (
    <div className='h-full w-full'>
      <div className='py-8'>
        <h1 className='text-4xl font-semibold'>Tickets</h1>
      </div>
      <div className='mb-6'>
        <div className='mb-3'>
          <h1 className='font-semibold text-lg'>Upcoming</h1>
          <hr />
        </div>
        <EventCard href='/member/events/123' />
      </div>
      <div className=''>
        <div className='mb-3'>
          <h1 className='font-semibold text-lg'>Past tickets</h1>
          <hr />
          <div className='space-y-4 pt-3 pb-8'>
            <EventCard bordered='border-b' href='/member/tickets/123' />
            <EventCard bordered='border-b' href='/member/tickets/1234' />
            <EventCard href='/member/tickets/12345' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page