/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Badge from '@/components/badge'
import NIAFooter from '@/components/footer'
import { ArrowLeft, DocumentUpload } from 'iconsax-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const EventDetail = () => {
    const { id } = useParams()

    const registration_status = 'Open'
    
    return (
        <div>
            <div className='sm:py-20 sm:px-32 xs:px-6'>
                <div className='flex justify-between items-center pt-6 w-full'>
                    <Link href={'/events'} className='flex items-center space-x-2'>
                        <ArrowLeft variant='Outline' size={20} className='#000000' />
                        <span className='text-[14px]'>Back to events ({id})</span>
                    </Link>
                    <button className='flex space-x-2 py-2 items-center justify-center border rounded-xl px-3'>
                        <DocumentUpload variant='Outline' size={18} color='#52474B' />
                        <span className='text-[14px] text-[#52474B]'>Share event</span>
                    </button>
                </div>
                <div className='py-6 overflow-hidden rounded-2xl shadow-2xl'>
                    <img src='/assets/events/event-detail.svg' className='w-full rounded-t-2xl' />
                    <div className='pt-5 px-5'>
                        <div className='flex space-x-2'>
                            <Badge label={'Offline'} className='flex justify-center items-center rounded-2xl bg-[#F3ECE2] px-3' labelStyle='text-[12px]' />
                            <Badge label={'Open'} className={`flex justify-center items-center rounded-2xl ${registration_status === 'Open' ? 'bg-[#E2F3E6]' : ' bg-[#F3E2E2]'} px-3`} labelStyle='text-[12px]' />
                        </div>
                        <div className='text-[32px] pt-2'>
                            <h1>Innovate Architecture Conference</h1>
                        </div>
                    </div>
                </div>
            </div>
            <NIAFooter />
        </div>
    )
}

export default EventDetail