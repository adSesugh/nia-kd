'use client'

import EventCard from '@/components/event/event-card'
import NIAFooter from '@/components/footer'
import SubHeader from '@/components/sub-header'
import { SearchNormal } from 'iconsax-react'
import React, { useEffect, useState } from 'react'

import * as Yup from 'yup'
import { Event, useGetEventsForPublicLazyQuery } from '@/graphql/__generated__/graphql'
import { Spinner } from '@nextui-org/react'

const Events = () => {
  const [events, setEvents] = useState<any>([])
  const [eventsHolder, setEventsHolder] = useState<any>([])
  const [selectedSearch, setSelectedSearch] = useState('all')
  const [getEvents, {loading}] = useGetEventsForPublicLazyQuery({fetchPolicy: 'no-cache'})

  useEffect(() => {
    getAllEvents()
  }, [])

  const getAllEvents = async () => {
    const res = (await getEvents()).data
    setEvents(res?.getEventsForPublic)
    setEventsHolder(res?.getEventsForPublic)
  }

  const upcomingEvents = (status: string) => {
    const upcomingEvents = eventsHolder?.filter((event: Event) => event.status === status)
    setEvents(upcomingEvents)
  }

  const pastEvents = (status: string) => {
    const pastEvents = eventsHolder?.filter((event: Event) => event.status === status)
    setEvents(pastEvents)
  }

  const searchEvents = (query: string) => {
    if(query.length === 0) {
      setEvents(eventsHolder)
    } else {
      const filteredEvents = events.filter((event: Event) => {
        return event.name.toLowerCase().includes(query)
      })
      setEvents(filteredEvents)
    }
  }

  return (
    <React.Fragment>
      <SubHeader title='Events' subtitle={'Explore our latest events and programmes'} />
      <div className='bg-[#F3ECE2] sm:px-28 xs:px-6 w-full'>
        <div className='flex sm:flex-row xs:flex-col-reverse py-8 items-center gap-6 xs:-mx-1.5 sm:mx-0'>
          <div className='flex bg-white border border-[#BDBDBD] h-12 px-1 items-center rounded-md shadow-sm'>
            <button onClick={() => {
              setSelectedSearch('all')
              getAllEvents()
            }} className={`${selectedSearch === 'all' && 'bg-[#1E1A1C] text-white'} h-10 w-[122px] py-1.5 `}>All</button>
            <button onClick={() => {
              setSelectedSearch('upcoming')
              upcomingEvents('Published')
            }} className={`${selectedSearch === 'upcoming' && 'bg-[#1E1A1C] text-white'} h-10 w-[122px] py-1.5 `}>Upcoming</button>
            <button onClick={() => {
              setSelectedSearch('past')
              pastEvents('Ended')
            }} className={`${selectedSearch === 'past' && 'bg-[#1E1A1C] text-white'} h-10 w-[122px] py-1.5 `}>Past</button>
          </div>
          <div className='flex-1 items-center h-full w-full mt-1'>
            <div className='relative rounded-md shadow-sm'>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchNormal variant='Outline' size={24} color='gray' />
              </div>
              <input 
                name='query'
                placeholder='Search events'
                type='search'
                className={`pr-3 pl-10 rounded-none h-12 block w-full border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
                onChange={(e) => searchEvents(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='pb-12'>
          <h1 className='pb-2'>Showing {events?.length} events</h1>
          {loading ? (
            <div className='flex py-5 items-center justify-center h-72'>
              <Spinner size='md' color={`default`} />
            </div>
          ): events?.length === 0 ? (
            <div className='flex py-5 items-center justify-center h-72'>
              <span>No event found</span>
            </div>
          ): (
            <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-x-6 gap-y-3 justify-between pb-6'>
              {events?.map((event: Event, index: number) => (
                <EventCard event={event} href={`/events/${event.id}`} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      <NIAFooter />
    </React.Fragment>
  )
}

export default Events