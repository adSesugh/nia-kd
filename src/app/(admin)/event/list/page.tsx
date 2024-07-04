'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import TitleHeader from '../../TitleHeader'
import Link from 'next/link'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useGetEventsLazyQuery, Event, useCancelEventMutation, useDeleteEventMutation } from '@/graphql/__generated__/graphql'
import { DotsThreeVertical } from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { SearchNormal } from 'iconsax-react'
import CustomSearch from '@/components/custom-select'

const eventStatuses = [
  {
    id: 'Draft',
    name: 'Draft'
  },
  {
      id: 'Published',
      name: 'Published'
  },
  {
    id: 'Ended',
    name: 'Ended'
}
]

const Events = () => {
  const router = useRouter()
  const [events, setEvents] = useState<any>([])
  const [eventsHolder, setEventsHolder] = useState<any>([])
  const [index, setIndex] = useState<number>(0)
  const [selectValue, setSelectValue] = useState<string>('')
  const [getEventList, {loading}] = useGetEventsLazyQuery({fetchPolicy: 'no-cache'})
  const [cancelEvent] = useCancelEventMutation({fetchPolicy: 'no-cache'})
  const [deleteEvent] = useDeleteEventMutation({fetchPolicy: 'no-cache'})

  const loadingState = loading || events === 0 ? "loading" : "idle";

  useEffect(() => {
    document.title = 'Events | NIA-Kd'
    ;(async () => {
        const res = await getEventList()
        if(res.error){
            toast.error(res.error.message)
        } else{
            setEvents(res?.data?.getEvents)
            setEventsHolder(res?.data?.getEvents)
        }
    })()
  }, [getEventList])

  const renderCell = React.useCallback((event: Event, columnKey: React.Key, index: number) => {
      const cellValue = event[columnKey as keyof Event];
      const state = event.address?.split(',')[event.address.split(',').length - 2]
      const country = event.address?.split(',')[event.address.split(',').length - 1]
      
      switch (columnKey) {
          case "id":
              setIndex(cur => cur + 1)
              return <span>{index}</span>;
          case "starts_at":
            return (
              <div>
                <h1 className='text-[#E08D14] font-medium'>{moment(event.starts_at).format("MMM")}</h1>
                <h1>{moment(event.starts_at).format("D, Y")}</h1>
              </div>
            )
          case "event":
              return (
                  <div className='flex gap-3'>
                    <img 
                      src={event.coverPhoto || '/assets/events/event.svg'} 
                      alt={event.name} 
                      className='h-16 w-16'
                    />
                    <div className='flex flex-col items-start justify-center'>
                      <h1 className='font-medium text-sm'>{event.name}</h1>
                      <div className='flex space-x-3 text-sm text-[#52474B]'>
                        <span>{"9:00 AM"}</span>
                        {(event.link || event.address) && <span>|</span> }
                        {event.type === 'Physical' ? (
                          <span>{state}, {country}</span>
                        ): (
                          <span>{event.link}</span>
                        )}
                      </div>
                    </div>
                  </div>
              )
          case "tickets":
            return (
              <span>{Number(event.eventRegistrations?.length) || 0}/{event.isInfinity || event.tickets === 0 ? '\u221E' : event.tickets}</span>
            )
          case "status":
              return (
                  <Chip className="capitalize" color={event.status === 'Published' ? 'success' : 'default'} size="sm" variant="flat">
                      <span className={`${event.status === 'Published' ? 'text-[#0A7535]' : 'text-[#4D4B4C]'}`}>{cellValue}</span>
                  </Chip>
              );
          case "actions":
              return (
                  <div className="relative flex justify-end items-center gap-2">
                      <Dropdown>
                      <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <DotsThreeVertical size={40} className="text-default-300" color='#161314' />
                          </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem onClick={() => router.push(`/event/${event.id}`)}>Manage</DropdownItem>
                          {event.status === 'Published' ? (
                            <DropdownItem onClick={() => cancelPublishedEvent(event.id, 'Draft')}>Cancel</DropdownItem>
                          ): (
                            <DropdownItem onClick={() => cancelPublishedEvent(event.id, 'Published')}>Publish</DropdownItem>
                          )}
                          <DropdownItem>Duplicate</DropdownItem>
                          <DropdownItem className='text-[#C70F0F]' onClick={() => archiveEvent(event.id)}>Delete</DropdownItem>
                      </DropdownMenu>
                      </Dropdown>
                  </div>
              );
          default:
              return cellValue;
      }
  }, []);

  const cancelPublishedEvent = async(id: string, status: string) => {
    (await cancelEvent({
      variables: {
        eventId: id,
        status: status
      }
    })).data

    return setEvents((await getEventList()).data?.getEvents)
  } 

  const archiveEvent = async(eventId: string) => {
    (await deleteEvent({
      variables: {
        eventId
      }
    }))

    return setEvents((await getEventList()).data?.getEvents)    
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

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSelectValue(value)
    if(value.length === 0 || value === 'All') {
      setEvents(eventsHolder)
    } else {
      const filteredEvents = events?.filter((event: Event) => {
        return event.name.toLowerCase().includes(value)
      })
      setEvents(filteredEvents)
    }
  }
  
  return (
    <div className='sm:px-12 xs:px-4 h-full overflow-y-auto pb-12'>
      <div className='flex justify-between items-center'>
          <TitleHeader title='Events' />
          <div className='sm:pt-14 xs:pt-2'>
            <Link 
              href={'/event/create'}
              className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
            >
              Create event
            </Link>
          </div>
      </div>
      <div className='pt-6 pb-4'>
        <div className='flex sm:flex-row xs:flex-col sm:space-x-3 items-center h-full w-full mt-1'>
          <div className='relative rounded-md shadow-sm sm:w-1/3 xs:w-full'>
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
          <div>
            <CustomSearch 
              data={eventStatuses}
              name='query'
              nullValue='All'
              onChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
      <div>
        <Table aria-label="">
          <TableHeader>
              <TableColumn key="id">S/N</TableColumn>
              <TableColumn key="starts_at">Date</TableColumn>
              <TableColumn key="event">Event</TableColumn>
              <TableColumn key="type">Type</TableColumn>
              <TableColumn key="tickets">Tickets sold</TableColumn>
              <TableColumn key="status">Status</TableColumn>
              <TableColumn key={'actions'}>.</TableColumn>
          </TableHeader>
          <TableBody
              items={events ?? []}
              loadingContent={<Spinner color='default' />}
              loadingState={loadingState}
              emptyContent={(
                <div className='flex flex-col items-center justify-center gap-3'>
                  <Image 
                    src={'/assets/event-empty.png'} 
                    alt='empty state' 
                    width={10} 
                    height={10} 
                    sizes='100vw'
                    style={{
                      width: '5%',
                      height: 'auto'
                    }}
                  />
                  <span>No events to display.</span>
                  <Link 
                    href={'/event/create'}
                    className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                  >
                    Create event
                  </Link>
                </div>
              )}
          >
              {(item: Event) => (
                  <TableRow key={item?.id} className='border-b last:border-b-0'>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                  </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Events