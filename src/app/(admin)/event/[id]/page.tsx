'use client'

import { useGetEventLazyQuery } from '@/graphql/__generated__/graphql'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Eye, EyeSlash } from '@phosphor-icons/react'
import EventAttendance from '@/components/event/Attendance'
import EventRegistrations from '@/components/event/EventRegistrations'

const EventDetail = () => {
    const { id } = useParams()
    const router = useRouter()
    const [event, setEvent] = useState<any>()
    const [hide, setShow] = useState<boolean>(true)
    const [selectedTab, setSelectedTab] = useState('registrations')
    const [getEvent ] = useGetEventLazyQuery({fetchPolicy: 'no-cache'})

    useEffect(()=> {
        document.title = `Event - ${id} | NIA-Kd`
        ;(async() => {
            const res = (await getEvent({
                variables: {
                    eventId: id
                }
            })).data
            setEvent(res?.getEvent)
        })()
    }, [getEvent, id])

    return (
        <div className='h-full overflow-y-auto'>
            <div className='flex h-20 bg-white pt-2 justify-between items-center sm:px-12 xs:px-4'>
                <div className='space-y-1'>
                    <div className='flex space-x-2 items-center cursor-pointer' onClick={() => router.back()}>
                        <ArrowLeft size={20} color='#554E51' />
                        <span className='text-sm text-[#554E51]'>Back to events</span>
                    </div>
                    <h1 className='font-medium'>{event?.name}</h1>
                </div>
                <div className=' cursor-pointer'>
                    {hide ? (
                        <div className='flex space-x-3 items-center' onClick={() => setShow(prev => !prev)}>
                            <Eye size={20} /> <span>Hide performance</span>
                        </div>
                    ): (
                        <div className='flex space-x-3 items-center' onClick={() => setShow(prev => !prev)}>
                            <EyeSlash size={20} /><span>Show performance</span>
                        </div>
                    )}
                </div>
            </div>
            {hide && (
                <div className='w-full pt-5 sm:px-12 xs:px-4'>
                    <div className='pb-5'>
                        <h1 className='font-medium'>Performance</h1>
                    </div>
                    <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-8 w-full'>
                        <div className='flex bg-white h-32 rounded-xl shadow-sm border'>
                            <div className='w-full h-full px-8 py-4'>
                                <h1 className='pb-3 text-sm'>Page views</h1>
                                <h1 className='text-xl font-medium'>{event?.views || 0}</h1>
                            </div>
                        </div>
                        <div className='flex bg-white h-32 rounded-xl shadow-sm border'>
                            <div className='w-full h-full px-8 py-4'>
                                <h1 className='pb-3 text-sm'>Registrations</h1>
                                <h1 className='text-xl font-medium'>{Number(event?.eventRegistrations.length) || 0}<small className='text-[#6D6D6D] text-[13px]'>/{event?.isInfinity || event?.tickets === 0 ? '\u221E' : event?.tickets}</small></h1>
                            </div>
                        </div>
                        <div className='flex bg-white h-32 rounded-xl shadow-sm border'>
                            <div className='w-full h-full px-8 py-4'>
                                <h1 className='pb-3 text-sm'>Net Sales</h1>
                                <h1 className='text-xl font-medium'>{'\u20a6'}{Intl.NumberFormat().format((Number(event?.eventRegistrations.length) * event?.amount) || 0)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='pt-5 pb-3 sm:px-12 xs:px-4'>
                <div className='flex pb-3 mb-3 border-b border-[#DBDBDB] w-full'>
                    <div className='-mb-2.5 space-x-6'>
                    <button className={selectedTab === 'registrations' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm text-[#909090]'} onClick={() => setSelectedTab('registrations')}>Registrations</button>
                    <button className={selectedTab === 'attendance' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm text-[#909090]'} onClick={() => setSelectedTab('attendance')}>Attendance</button>
                    </div>
                </div>
                {selectedTab === 'registrations' && <EventRegistrations eventId={id as string} />}
                {selectedTab === 'attendance' && <EventAttendance eventId={id as string} />}
            </div>
        </div>
    )
}

export default EventDetail