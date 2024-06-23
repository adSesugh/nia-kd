'use client'

import React, { Fragment, useEffect } from 'react'
import EventCard from '../events/EventCard';
import { useGetPastEventsQuery, useGetUpComingEventsQuery } from '@/graphql/__generated__/graphql';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';

// export const metadata: Metadata = {
//   title: "Tickets | NIA-Kd",
//   description: "NIA-Kd Home",
// };

const TicketList = () => {
  const user = useSelector((state: RootState) => state.auth.userData.user)

  const {data, loading} = useGetUpComingEventsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      memberId: user?.member?.id
    }
  })

  const {data: past, loading: pastLoading} = useGetPastEventsQuery({fetchPolicy: 'no-cache'})

  useEffect(() => {
    document.title = `Tickets | NIA-Kd`
  }, [])

  return (
    <div className='w-full'>
      <div className='pb-8 pt-2'>
        <h1 className='text-2xl font-semibold'>Tickets</h1>
      </div>
      {Number(data?.getUpComingEvents?.length) > 0 || Number(past?.getPastEvents?.length) > 0 ? (
        <Fragment>
          {Number(data?.getUpComingEvents?.length) > 0 && (
            <div className='mb-10'>
              <div className='mb-5'>
                <h1 className='font-semibold text-lg mb-3'>Upcoming</h1>
              </div>
              {data?.getUpComingEvents?.map((event, index: number) => (
                <EventCard 
                  indexData={index} 
                  type='upcoming' key={event.id} href={`/events/${event?.event?.id}`} 
                  data={event} 
                />
              ))}
            </div>
          )}
          {Number(past?.getPastEvents?.length) > 0 && (
            <div className=''>
              <div className='pb-5'>
                <h1 className='font-semibold text-lg mb-3'>Past tickets</h1>
                <div className='space-y-5 pt-3 pb-8'>
                  {past?.getPastEvents?.map((item, index: number) => (
                    <EventCard 
                      key={index}
                      indexData={index}
                      bordered={index === (Number(past?.getPastEvents?.length) - 1) ? 'border-none': 'border-b-2'} 
                      href={`/events/${item.id}`} 
                      data={item}
                      type='past'
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      ): loading || pastLoading ? (
        <div className='h-full'>
          <div className='flex justify-center items-center h-full w-full'>
            <Spinner color='default' size='lg' />
          </div>
        </div>
      ): (
        <div className='h-60'>
          <div className='flex justify-center items-center h-full w-full'>
            <div className='flex flex-col items-center justify-center gap-3'>
              <Image 
                src={'/assets/event-empty.png'} 
                alt='empty state' 
                width={10} 
                height={10} 
                sizes='100vw'
                style={{
                  width: '35%',
                  height: 'auto'
                }}
              />
              <span className='text-xl text-slate-blue-100'>No record found</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketList