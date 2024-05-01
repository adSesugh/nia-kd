import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type EventCardProps = {
    bordered?: string
    href?: string
}

const EventCard: React.FC<EventCardProps> = ({ bordered, href='/' }) => {
    return (
        <Link href={href} className='flex gap-5 cursor-pointer'>
            <div className='flex gap-6 w-1/3'>
                <div>
                    <h1 className='text-[#E08D14]'>{'aug'.toUpperCase()}</h1>
                    <span className='text-2xl font-semibold'>22</span>
                </div>
                <div>
                    <Image
                        alt='event pix'
                        src={'/assets/events/upcoming-event.svg'} 
                        sizes='100vw'
                        width={10}
                        height={10}
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                        className='rounded-2xl max-sm:w-8'
                    />
                </div>
            </div>
            <div className={`w-2/3 space-y-2 ${bordered}`}>
                <h1 className='flex flex-wrap text-2xl font-medium truncate'>Digital Architectural Transformation Workshop</h1>
                <div className='text-sm divide-x-[2px] divide-gray-300 space-x-4'>
                    <span className='font-semibold'>Jun 23, 2023</span>
                    <span className='text-[#52474B] pl-4'>09:00 AM</span>
                </div>
                <h6 className='text-[#52474B] text-sm'>Registered on Fri, Apr 22,2023 @ 10:36 AM</h6>
            </div>
        </Link>
    )
}

export default EventCard