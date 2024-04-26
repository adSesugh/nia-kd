import Badge from '@/components/badge'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type EventCardProps = {
    id: string
    photoUrl: string
    title: string
    registered: number
    meeting_mode: string
    registration_status: string
    event_date: string
    event_starts: string
    event_fee: number
}
const EventCard: React.FC<EventCardProps> = ({photoUrl, title, registered, meeting_mode, registration_status, event_date, event_starts, event_fee}) => {
    return (
        <Link href={'/events/383sfj'} className='rounded-2xl overflow-hidden'>
            <figure>
                <Image 
                    src={photoUrl} 
                    alt={title.replaceAll(' ', '-')}
                    sizes="100vw"
                    width={100}
                    height={100}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }} 
                    className='w-full rounded-t-2xl'
                />
            </figure>
            <div className='bg-white p-3'>
                <div className='flex justify-between'>
                    <div className='flex space-x-2'>
                        <Badge label={meeting_mode} className='flex justify-center items-center rounded-2xl bg-[#F3ECE2] px-3' labelStyle='text-[12px]' />
                        <Badge label={registration_status} className={`flex justify-center items-center rounded-2xl ${registration_status === 'Open' ? 'bg-[#E2F3E6]' : ' bg-[#F3E2E2]'} px-3`} labelStyle='text-[12px]' />
                    </div>
                    <div>
                        <span className='text-[12px]'>{registered}+ already registered</span>
                    </div>
                </div>
                <div className='py-2'>
                    <h1 className='font-medium'>{title}</h1>
                    <div className='divide divide-x-2 space-x-2'>
                        <span className='text-[12px]'>{event_date}</span>
                        <span className='text-[12px] pl-2'>{event_starts}</span>
                    </div>
                </div>
                <div className='pt-3'>
                    <h1 className='text-lg font-semibold'>{'\u20a6'}{Intl.NumberFormat().format(event_fee)}</h1>
                </div>
            </div>
        </Link>
    )
}

export default EventCard