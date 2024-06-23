'use client'

import { Badge } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { getTotalDaysInYear, getTotalDaysOfYear } from '@/lib/helpers';
import { Spinner, Tooltip } from '@nextui-org/react';
import { useAppSelector } from '@/features/hooks';
import { RootState } from '@/features/store';
import { CurrencyNgn, Info } from '@phosphor-icons/react';
import { Chart as ChartJS, ArcElement, Tooltip as ToolkitChart, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useGetMemberStatQuery, useGetPastEventsQuery, useGetUpComingEventsQuery } from '@/graphql/__generated__/graphql';
import EventCard from '../events/EventCard';

ChartJS.register(ArcElement, ToolkitChart, Legend);

const MemberDashboard = () => {
  
  useEffect(() => {
    document.title = 'Dashboard | NIA-kd'
  }, [])

  const user = useAppSelector((state: RootState) => state.auth.userData.user)
  const daysGone = getTotalDaysInYear(new Date().getFullYear()) - getTotalDaysOfYear(new Date())
  const daysOfYear = getTotalDaysOfYear(new Date())

  const {data: memberStat, loading} = useGetMemberStatQuery({
    variables: {
      memberId: user?.member?.id
    }
  })

  const {data: upComing, loading: upComingLoader } = useGetUpComingEventsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      memberId: user?.member?.id
    }
  })

  const {data: past, loading: pastLoading} = useGetPastEventsQuery({fetchPolicy: 'no-cache'})

  const data = {
    datasets: [
      {
        label: 'Due date count',
        data: [daysGone, daysOfYear],
        backgroundColor: [
          '#C70F0F',
          '#F0EAEA',
        ],
        borderWidth: 0.5,
      },
    ],
  };
  
  //const getPercent = getDaysPercentage( getTotalDaysOfYear(new Date()), getTotalDaysInYear(new Date().getFullYear()))

  return (
    <div className='h-full w-full xs:px-6 sm:px-10 bg-gray-100 overflow-y-auto pb-8'>
      <div className='py-6 w-full pt-6'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-2xl'>{user?.member?.firstName} {user?.member?.lastName}</h1>
          <div className='flex'>
            <Badge className='text-[12px] text-center text-white rounded-md bg-[#40AD36] font-normal'>{user?.member?.membershipType?.name} member</Badge>
          </div>
        </div>
      </div>
      <div className='flex xs:flex-col sm:flex-row gap-5 justify-between items-center'>
        <div className='flex flex-col sm:w-4/8 xs:w-full border bg-white rounded-2xl overflow-hidden'>
          <div className='flex space-x-2 items-center p-4 '>
            <div className='flex space-x-2 py-1'>
              <div className='flex h-12 w-12 justify-center items-center bg-[#F2F2F2] rounded-full'>
                <CurrencyNgn size={24} color='#333030' />
              </div>
              <div className='flex flex-col'>
                <h1 className='text-lg font-medium'>Financial Status</h1>
                <div className='flex items-center justify-start'>
                  <span className={`text-white ${memberStat?.getMemberStat?.fin_status ? 'bg-[#40AD36]' : 'bg-[#C70F0F]'} py-[1px] px-2 rounded-md text-[12px]`}>Financial</span>
                </div>
              </div>
            </div>
          </div>
          <div className='h-12 bg-[#EFEFEF] px-6'>
            <div className='flex space-x-1 h-full items-center'>
              <div className='pb-2'><Pie data={data} height={40} width={40} /></div>
              <span className='text-[13px] text-gray-500'>You have {getTotalDaysInYear(new Date().getFullYear()) - getTotalDaysOfYear(new Date())} days left till next due payment</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:w-2/8 xs:w-full border bg-white p-4 rounded-2xl'>
          <div className='flex pb-4 space-x-2 items-center'>
            <h1>CPDP Points</h1>
            <Tooltip
              placement={'top-start'}
              content={'Coming soon...'}
              color="secondary"
            >
              <Info/>
            </Tooltip>
          </div>
          <div className='flex flex-row divide-x divide-gray-300 justify-center items-center'>
            <div className='pr-16'>
              <span className='text-[25px] font-semibold text-[#1E1A1C]'>
                {loading ? (
                  <Spinner color='default' size='sm' />
                ): (
                  <>{memberStat?.getMemberStat?.totalEventPoints || 0}</>
                )}
              </span>
              <h1 className='text-[#545454] text-sm'>Available</h1>
            </div>
            <div className='pl-16'>
              <span className='text-[25px] font-semibold text-[#1E1A1C]'>
              {loading ? (
                  <Spinner color='default' size='sm' />
                ): (
                  <>{memberStat?.getMemberStat?.pointsEarned || 0}</>
                )}
              </span>
              <h1 className='text-[#545454] text-sm'>Earned</h1>
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:w-2/8 xs:w-full border bg-white p-4 rounded-2xl'>
          <div className='pb-4'>
            <h1>Events</h1>
          </div>
          <div className='flex flex-row divide-x divide-gray-300 justify-center items-center'>
            <div className='pr-16'>
              <span className='text-[25px] font-semibold text-[#1E1A1C]'>
                {loading ? (
                  <Spinner color='default' size='sm' />
                ): (
                  <>{memberStat?.getMemberStat?.eventAttended || 0}</>
                )}
              </span>
              <h1 className='text-[#545454] text-sm'>Attended</h1>
            </div>
            <div className='pl-16'>
              <span className='text-[25px] font-semibold text-[#1E1A1C]'>
                {loading ? (
                  <Spinner color='default' size='sm' />
                ): (
                  <>0</>
                )}
              </span>
              <h1 className='text-[#545454] text-sm'>Certificates</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-8 w-full'>
        <div className='flex xs:flex-col sm:flex-row gap-4 h-full'>
          <div className='sm:w-1/2 xs:w-full bg-white rounded-2xl p-4'>
            <div className='h-60 w-full'>
              <h1 className='text-sm font-semibold'>Upcoming events</h1>
              {Number(upComing?.getUpComingEvents?.length) > 0 ? (
                <div className='h-60 w-full pt-10'>
                  {upComing?.getUpComingEvents?.map((event, index: number) => (
                    <EventCard 
                      indexData={index} 
                      type='upcoming' key={event.id} href={`/events/${event?.event?.id}`} 
                      data={event} 
                      registered={true}
                    />
                  ))}
                </div>
              ): upComingLoader ? (
                <div className='flex flex-col items-center justify-center h-60 w-full pt-10'>
                  <Spinner size='sm' color='default' />
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center h-60 w-full pt-10'>
                  <Image
                    className=''
                    alt='no-search-found'
                    src={'/assets/search.svg'}
                    width={100}
                    height={100}
                    sizes='60vw'
                    style={{
                      width: '10%',
                      height: 'auto'
                    }} 
                  />
                  <span className='text-[13px] text-[#5E5959] py-4'>You have not registered for any event yet</span>
                </div>
              )}
            </div>
          </div>
          <div className='sm:w-1/2 xs:w-full bg-white rounded-2xl p-4'>
            <div className='h-60 w-full'>
              <h1 className='text-sm font-semibold'>Recent events</h1>
              {Number(past?.getPastEvents?.length) > 0 ? (
                <div className='h-60 w-full pt-10'>
                  {past?.getPastEvents?.map((recent, index:number) => (
                    <EventCard  
                      key={index}
                      indexData={index}
                      bordered={index === (Number(past?.getPastEvents?.length) - 1) ? 'border-none': 'border-b-2'} 
                      href={`/events/${recent.id}`} 
                      data={recent}
                      type='past'
                    />
                  ))}
                </div>
              ): pastLoading ? (
                <div className='flex flex-col items-center justify-center h-60 w-full pt-10'>
                  <Spinner size='sm' color='default' />
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center h-60 w-full pt-10'>
                  <Image
                    className=''
                    alt='no-search-found'
                    src={'/assets/search.svg'}
                    width={100}
                    height={100}
                    sizes='60vw'
                    style={{
                      width: '10%',
                      height: 'auto'
                    }} 
                  />
                  <span className='text-[13px] text-[#5E5959] py-4'>You have not attended any events yet</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDashboard