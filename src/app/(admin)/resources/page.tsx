'use client'

import React, { useState } from 'react'
import TitleHeader from '../TitleHeader'
import Link from 'next/link'
import Image from 'next/image'
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Event } from '@/graphql/__generated__/graphql'
import moment from 'moment'

const ResourceList = () => {
  const [index, setIndex] = useState<number>(0)
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
                    
                </div>
            );
        default:
            return cellValue;
    }
  }, []);

  return (
    <div className='sm:px-12 xs:px-4 h-full overflow-y-auto'>
      <div className='flex justify-between items-center'>
          <TitleHeader title='Resources' />
          <div className='sm:pt-10 xs:pt-2'>
            <Link 
              aria-disabled={true}
              href={'/blogs/create'}
              className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
              >
                Upload
            </Link>
          </div>
      </div>
      <div className='pt-8'>
        <Table aria-label="">
          <TableHeader>
            <TableColumn key="id">S/N</TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="type">Type</TableColumn>
            <TableColumn key="size">Size</TableColumn>
            <TableColumn key="uploaded">Uploaded</TableColumn>
            <TableColumn key={'actions'}>.</TableColumn>
          </TableHeader>
          <TableBody
          items={[] ?? []}
          loadingContent={<Spinner color='default' />}
          loadingState={'idle'}
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
              <span>No resource to display.</span>
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

export default ResourceList