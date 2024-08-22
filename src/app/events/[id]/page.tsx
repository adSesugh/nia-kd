/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Badge from '@/components/badge'
import NIAFooter from '@/components/footer'
import { useGetEventForPublicQuery, useWatchEventViewsMutation } from '@/graphql/__generated__/graphql'
import { ArrowLeft, DocumentUpload } from 'iconsax-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const EventDetail = () => {
    const { id } = useParams()

    const [eventView] = useWatchEventViewsMutation()
    const { data, loading } = useGetEventForPublicQuery({
        variables: {
            eventId: id
        }
    })

    useEffect(()=> {
        ;(async() => {
            await eventView({
                variables: {
                    eventId: id
                }
            })
        })()
    }, [eventView, id])

    const registerForEvent = () =>  redirect(`/events/${id}/register`)
    
    return (
        <div>
            <div className='sm:py-20 sm:px-40 xs:px-6 pt-20'>
                <div className='flex justify-between items-center pt-6 w-full pb-6'>
                    <Link href={'/events'} className='flex items-center space-x-2 '>
                        <ArrowLeft variant='Outline' size={20} className='rgb(82 71 75 / 0.7)' />
                        <span className='text-[14px] text-[#52474B]/70'>Back to events ({data?.getEvent?.name})</span>
                    </Link>
                </div>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='pt-0 pb-3 px-5'>
                            <div className='flex space-x-2'>
                                <Badge label={data?.getEvent?.type as string} className='flex justify-center items-center rounded-2xl bg-[#F3ECE2] px-3' labelStyle='text-[12px]' />
                                <Badge label={data?.getEvent?.status === 'Published' ? 'Open': 'Closed'} className={`flex justify-center items-center rounded-2xl ${data?.getEvent?.status === 'Published' ? 'bg-[#E2F3E6]' : ' bg-[#F3E2E2]'} px-3`} labelStyle='text-[12px]' />
                            </div>
                            <div className='text-[20px] pt-2'>
                                <h1 className=''>{data?.getEvent?.name}</h1>
                            </div>
                        </div>
                        <div>
                            <button className='flex space-x-2 py-2 items-center justify-center border rounded-xl px-3 bg-[#F3ECE2]'>
                                <DocumentUpload variant='Outline' size={18} color='#52474B' />
                                <span className='text-[14px] text-[#52474B]/70'>Share event</span>
                            </button>
                        </div>
                    </div>
                    <div className='relative h-[20%] w-full overflow-hidden'>
                        <Image 
                            src={data?.getEvent?.coverPhoto || '/assets/events/event-detail.svg'} 
                            alt={data?.getEvent?.name as string || 'event cover'}
                            className='h-full w-full rounded-[25px]'
                            //layout='fill'
                            //objectFit='contain'
                            height={250}
                            width={250}
                        />
                    </div>
                </div>
                <div className='flex sm:flex-row xs:flex-col w-full py-5'>
                    <div className='sm:w-8/12 xs:w-full mr-4'>
                       <div className='p-5 w-full'>
                            <h1 className='font-semibold text-[18px]'>About Event</h1>
                            <div className='py-2 text-[#1E1A1C]' dangerouslySetInnerHTML={{ __html: data?.getEvent?.description || ''}}></div>
                       </div>
                        {data?.getEvent?.speakers?.length !== 0 && (
                            <div className='my-4 p-4 w-full'>
                                <h1 className='font-semibold text-[18px]'>Speakers</h1>
                                <div className='grid sm:grid-cols-4 xs:grid-cols-1 gap-4 space-y-3 mt-3'>
                                    {data?.getEvent?.speakers?.map((speaker) => (
                                        <div key={speaker?.id} className='flex flex-col space-y-3'>
                                            <div><img src={speaker?.avatar || '/assets/profile.png'} className='h-56 rounded-[25px] w-full' alt={speaker?.name} /></div>
                                            <div className='flex items-center flex-col w-full'>
                                                <h2 className='font-semibold'>{speaker?.name}</h2>
                                                <span className='text-[12px] text-[#6F6F6F]'>{speaker?.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data?.getEvent?.type === 'Physical' && (
                            <div className='my-4 w-full'>
                                <h1 className='font-semibold text-[18px] px-4 my-3'>Map Location</h1>
                                <div className='mt-3'>
                                    <img src='/assets/map.svg' alt='Map location' className='w-full' />
                                </div>
                            </div>
                        )}
                        {!!data?.getEvent?.sponsors?.length && (
                            <div className='my-4 p-4 w-full'>
                                <h1 className='font-semibold text-[18px]'>Event Partners</h1>
                                <div className='flex flex-wrap space-y-3 gap-4 mt-3'>
                                    {data?.getEvent?.sponsors?.map(sponsor => (
                                        <img key={sponsor?.id} src={sponsor?.logo} alt={`sponsor-${sponsor?.id}`} className='h-16 w-16 rounded-md' />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='sm:w-4/12 xs:w-full'>
                        {data?.getEvent?.eventResources?.length !== 0 && (
                            <div className='border shadowm-sm rounded-[20px] p-4 w-full mb-4'>
                                {data?.getEvent?.eventResources?.map((resource, index: number) => (
                                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                                    <Link key={index} href={resource?.resourceUrl as string} target='__blank'>
                                        <div className="flex items-center mb-4" >
                                            <img src="/assets/PDF.png" alt="PDF Icon" className="w-6 h-6 mr-2" />
                                            <div className="flex-grow">
                                                <p className="font-medium text-sm">{resource?.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div className='border shadow-sm rounded-[20px] p-4 w-full'>
                            <div className='mb-3'>
                                <h4 className='text-[#9A9A9A] font-medium'>Happening</h4>
                                <h6 className='font-medium'>{moment(data?.getEvent?.starts_at).format('MMM D, Y')}  @  {moment(data?.getEvent?.starts_at).format('hh:mm A')}</h6>
                            </div>
                            {data?.getEvent?.address && (
                                <div className='mb-3'>
                                    <h4 className='text-[#9A9A9A] font-medium'>Where</h4>
                                    <p className='flex flex-wrap font-medium'>{data?.getEvent?.address}</p>
                                </div>
                            )}
                            <div className='flex flex-col items-center justify-center p-2 bg-[#F8F3ED] mx-3 rounded-xl'>
                                <h6 className='text-[#65575D] text-[14px]'>Registration fee</h6>
                                <span className='text-[32px] font-bold text-[#1E1A1C]'>{'\u20a6'}{Intl.NumberFormat('en-NG').format(Number(data?.getEvent?.amount) || 0)}</span>
                            </div>
                            {data?.getEvent?.status === 'Published' && (
                                <div className='mx-3 mt-2'>
                                    <button onClick={registerForEvent} className='py-2 bg-black text-white text-center w-full rounded-lg'>
                                        <Link href={{pathname: `/events/${data?.getEvent?.id}/register`}}>Register Now</Link>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <NIAFooter />
        </div>
    )
}

export default EventDetail