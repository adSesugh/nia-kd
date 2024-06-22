'use client'

import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type EventCardProps = {
    bordered?: string
    href?: string
    data?: any
    type?: string,
    indexData?: number | 0
    registered?: boolean
}

const EventCard: React.FC<EventCardProps> = ({ bordered, href='/', data, type, indexData, registered=false }) => {
    const [ratio, setRatio] = useState(16/9)
    
    return (
        <Link href={href} as={'div'} className='flex sm:flex-row xs:flex-col gap-y-5 gap-x-5 cursor-pointer'>
            <div className='flex gap-6 sm:w-3/12 xs:w-full'>
                <div>
                    <h1 className='text-[#E08D14]'>{moment(type === 'upcoming' ? data.event.starts_at : data.starts_at).format('MMM').toUpperCase()}</h1>
                    <span className='text-2xl font-semibold'>{moment(type === 'upcoming' ? data.event.starts_at : data.starts_at).format('DD')}</span>
                </div>
                <div>
                    <Image 
                        alt='event pix'
                        className='sm:rounded-2xl xs:rounded-lg'
                        width={300}
                        height={300 / ratio}
                        src={(type === 'upcoming' ? data.event.coverPhoto : data.coverPhoto) || '/assets/events/upcoming-event.svg'} 
                        sizes='100vw'
                        layout='fixed'
                        objectFit='cover'
                        onLoadingComplete={({ naturalWidth, naturalHeight }) =>  setRatio(naturalWidth / naturalHeight)}
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                </div>
            </div>
            <div className={`sm:w-9/12 xs:w-full space-y-2 ${bordered} xs:pb-1 sm:pb-0`}>
                {registered && <h1 className='text-sm text-green-500'>Registered</h1>}
                <h1 className='flex flex-wrap text-md font-medium truncate'>{type === 'upcoming' ? data.event.name : data.name}</h1>
                <div className='text-sm divide-x-[2px] divide-gray-300 space-x-4'>
                    <span className='font-semibold'>{moment(type === 'upcoming' ? data.event.starts_at : data.starts_at).format('MMM DD, Y')}</span>
                    <span className='text-[#52474B] pl-4'>{moment(type === 'upcoming' ? data.event.starts_at : data.starts_at).format('hh:mm A')}</span>
                </div>
                {data.eventRegistrations[indexData as number]?.memberId ? (
                    <h6 className='text-[#52474B] text-sm'>Registered on {moment(data.eventRegistrations[indexData as number].createdAt).format('ll @ LT')}</h6>
                ): (
                    <h6 className='text-[#52474B] text-sm'>{'Unregistered event'}</h6>
                )}
            </div>
        </Link>
    )
}

export default EventCard