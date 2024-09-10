import Badge from '@/components/badge'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Event } from '@/graphql/__generated__/graphql'
import moment from 'moment'
import EventPicture from '@/assets/event.svg'

type EventCardProps = {
    href: string
    event: Event
}

const EventCard: React.FC<EventCardProps> = ({href = '/', event }) => {

    const computeTickets = () => {
        const tickets : number = event?.eventPlanPrices?.reduce((acc, curr) => {
            return acc + Number(curr?.tickets);
        }, 0) ?? 0
        return Number(event?.tickets) + tickets
    }

    return (
        <Link href={`/events/${event.id}`} className='rounded-2xl shadow-sm overflow-hidden w-full bg-white'>
            <figure className='w-full'>
                <img
                    src={event?.coverPhoto || '/assets/events/event.svg'} 
                    alt={event?.name.replaceAll(' ', '-')}
                    className='w-full h-56 object-cover'
                    sizes='100vw'
                    style={{
                        width: '100%'
                    }}
                />
            </figure>
            <div className='bg-white p-3'>
                <div className='flex justify-between'>
                    <div className='flex space-x-2'>
                        <Badge label={event?.type} className='flex justify-center items-center rounded-2xl bg-[#F3ECE2] px-3' labelStyle='text-[12px]' />
                        <Badge label={event?.status === 'Published' ? 'Open': 'Closed'} className={`flex justify-center items-center rounded-2xl ${event?.status === 'Published' ? 'bg-[#E2F3E6]' : ' bg-[#F3E2E2]'} px-3`} labelStyle='text-[12px]' />
                    </div>
                    <div>
                        <span className='text-[12px]'>{event?.eventRegistrations?.length || 0}{((Number(computeTickets()) - Number(event?.eventRegistrations?.length)) === 0 && event?.eventRegistrations?.length) === 0 ? '' : '+'} already registered</span>
                    </div>
                </div>
                <div className='py-2'>
                    <h1 className='font-medium'>{event?.name}</h1>
                    <div className='divide divide-x-2 space-x-2'>
                        <span className='text-[12px]'>{moment(event?.starts_at).format('MMM d, Y')}</span>
                        <span className='text-[12px] pl-2'>{moment(event?.starts_at).format('hh:mm A')}</span>
                    </div>
                </div>
                <div className='pt-3'>
                    {event?.status === 'Ended' ? (
                        <h1 className='text-lg font-semibold'>{'Closed'}</h1>
                    ):(
                        <h1 className='text-lg font-semibold'>{'\u20a6'}{Intl.NumberFormat().format(event?.amount)}</h1>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default EventCard