/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Badge from '@/components/badge'
import NIAFooter from '@/components/footer'
import SubmitButton from '@/components/submit-button'
import { ArrowLeft, Clock, DocumentUpload, Ticket2 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useParams } from 'next/navigation'
import React from 'react'

const EventDetail = () => {
    const { id } = useParams()

    const registration_status = 'Open'

    const registerForEvent = () =>  redirect(`/events/${id}/register`)
    
    return (
        <div>
            <div className='sm:py-20 sm:px-32 xs:px-6'>
                <div className='flex justify-between items-center pt-6 w-full'>
                    <Link href={'/events'} className='flex items-center space-x-2 '>
                        <ArrowLeft variant='Outline' size={20} className='rgb(82 71 75 / 0.7)' />
                        <span className='text-[14px] text-[#52474B]/70'>Back to events ({id})</span>
                    </Link>
                    <button className='flex space-x-2 py-2 items-center justify-center border rounded-xl px-3'>
                        <DocumentUpload variant='Outline' size={18} color='#52474B' />
                        <span className='text-[14px] text-[#52474B]/70'>Share</span>
                    </button>
                </div>
                <div className='py-6 overflow-hidden rounded-2xl shadow-2xl'>
                    <Image 
                        src={'/assets/events/event-detail.svg'} 
                        alt='Event detail'
                        sizes="100vw"
                        width={100}
                        height={100}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }} 
                        className='w-full rounded-t-2xl'
                    />
                    <div className='pt-5 px-5'>
                        <div className='flex space-x-2'>
                            <Badge label={'Offline'} className='flex justify-center items-center rounded-2xl bg-[#F3ECE2] px-3' labelStyle='text-[12px]' />
                            <Badge label={'Open'} className={`flex justify-center items-center rounded-2xl ${registration_status === 'Open' ? 'bg-[#E2F3E6]' : ' bg-[#F3E2E2]'} px-3`} labelStyle='text-[12px]' />
                        </div>
                        <div className='text-[28px] pt-2'>
                            <h1>Innovate Architecture Conference</h1>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>

                </div>
                <div className='flex w-full py-5'>
                    <div className='w-9/12 mr-4'>
                       <div className='rounded-[20px] p-5 bg-gray-50 border w-full'>
                            <h1 className='font-semibold text-[18px]'>About Event</h1>
                            <div className='flex gap-5 py-2'>
                                <div className='flex gap-2 items-center'>
                                    <Clock variant='Outline' size={18} color='#1E1A1C' />
                                    <span className='text-[#52474B] text-[14px]'>3 hours 15 minutes</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <Ticket2 variant='Outline' size={18} color='#1E1A1C' />
                                    <span className='text-[#52474B] text-[14px]'>e-ticket available</span>
                                </div>
                            </div>
                            <p className='py-2 text-[#1E1A1C]'>Figma is a design platform for teams who build products together. Born on the Web, Figma helps the entire product team create and ship better designs. This event will help foster the need to innovate and be creative in the architectural space. It will be shown how a little creativity can do a lot to one’s output.</p>
                       </div>
                        <div className='my-4 border bg-gray-50 rounded-[20px] p-4 w-full'>
                            <h1 className='font-semibold text-[18px]'>Speakers</h1>
                            <div className='space-y-3 mt-3'>
                                <div className='flex space-x-2 items-center'>
                                    <img src='/assets/profile.png' className='h-7 w-7 rounded-full' />
                                    <div>
                                        <h2 className='font-semibold text-sm'>Victoria Samuel</h2>
                                        <span className='text-[12px] text-[#6F6F6F]'>Executive Director, Arts and Culture</span>
                                    </div>
                                </div>
                                <div className='flex space-x-2 items-center'>
                                    <img src='/assets/profile.png' className='h-7 w-7 rounded-full' />
                                    <div>
                                        <h2 className='font-semibold text-sm'>Victoria Samuel</h2>
                                        <span className='text-[12px] text-[#6F6F6F]'>Executive Director, Arts and Culture</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-4 border bg-gray-50 rounded-[20px] w-full'>
                            <h1 className='font-semibold text-[18px] px-4 my-3'>Map Location</h1>
                            <div className='mt-3'>
                                <img src='/assets/map.svg' alt='Map location' className='w-full' />
                            </div>
                        </div>
                        <div className='my-4 border bg-gray-50 rounded-[20px] p-4 w-full'>
                            <h1 className='font-semibold text-[18px]'>Event Partners</h1>
                            <div className='space-y-3 mt-3'>
                                <div className='flex space-x-2 items-center'>
                                    <img src='/assets/ife.svg' className='h-7 w-7 rounded-md' />
                                    <div>
                                        <h2 className='font-semibold text-sm'>Nigeria Institute of Architects</h2>
                                    </div>
                                </div>
                                <div className='flex space-x-2 items-center'>
                                    <img src='/assets/nestle.svg' className='h-7 w-7 rounded-md' />
                                    <div>
                                        <h2 className='font-semibold text-sm'>Nestle Foods</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/12'>
                        <div className='border bg-gray-50 rounded-[20px] p-4 w-full'>
                            <div className='mb-3'>
                                <h4 className='text-[#9A9A9A] font-medium'>Happening</h4>
                                <h6 className='font-medium'>Jun 23, 2023  @  09:00 AM</h6>
                            </div>
                            <div className='mb-3'>
                                <h4 className='text-[#9A9A9A] font-medium'>Where</h4>
                                <p className='font-medium'>Musa Yar’adua Center, Kaduna</p>
                            </div>
                            <div className='flex flex-col items-center justify-center p-2 bg-[#F8F3ED] mx-3 rounded-xl'>
                                <h6 className='text-[#65575D] text-[14px]'>Registration fee</h6>
                                <span className='text-[32px] font-bold text-[#1E1A1C]'>{'\u20a6'}{Intl.NumberFormat('en-NG').format(25000)}</span>
                            </div>
                            <div className='mx-3 mt-2'>
                                <button onClick={registerForEvent} className='py-2 bg-black text-white text-center w-full rounded-lg'>
                                    <Link href={`/events/${id}/register`}>Register Now</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NIAFooter />
        </div>
    )
}

export default EventDetail