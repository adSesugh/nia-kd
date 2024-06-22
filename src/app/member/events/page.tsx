'use client'

import EventCard from '@/components/event/event-card'
import { SearchNormal } from 'iconsax-react'
import React, { useEffect, useState } from 'react'

import { Event, useGetEventsForPublicLazyQuery } from '@/graphql/__generated__/graphql'
import { Spinner } from '@nextui-org/react'


const MemberEvents = () => {
  const [selectedSearch, setSelectedSearch] = useState('all')
  const [events, setEvents] = useState<any>([])
  const [eventsHolder, setEventsHolder] = useState<any>([])
  const [getEvents, {loading}] = useGetEventsForPublicLazyQuery({fetchPolicy: 'no-cache'})

  useEffect(() => {
    document.title = 'Events | NIA-Kd';
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
      const filteredEvents = events?.filter((event: Event) => {
        return event.name.toLowerCase().includes(query)
      })
      setEvents(filteredEvents)
    }
  }

  return (
    <React.Fragment>
      <div className=' sm:px-12 xs:px-6 w-full h-full overflow-y-auto'>
        <div>
          <h1 className='text-2xl font-semibold'>Events</h1>
          <span>Explore our latest events ang programmes</span>
        </div>
        <div className='flex sm:flex-row xs:flex-col-reverse py-8 items-center sm:gap-6 xs:gap-5 xs:-mx-1.5 sm:mx-0'>
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
            <div className='relative rounded-md shadow-sm sm:w-2/3 xs:w-full'>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchNormal variant='Outline' size={20} color='gray' />
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
        <div>
          <h1 className='pb-2'>Showing {events?.length || 0} events</h1>
          {loading ? (
            <div className='flex flex-col justify-center items-center h-60'>
              <Spinner color='default' size='md' />
              <h1>Loading, Please wait...</h1>
            </div>
          ): (
            <div className='grid sm:grid-cols-3 xs:grid-cols-1 xs:gap-6 sm:gap-x-12 sm:gap-y-6 justify-between pb-6'>
              {events.map((event: Event, index: number) => (
                <EventCard event={event} key={index} href={`/member/events/${event.id}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default MemberEvents