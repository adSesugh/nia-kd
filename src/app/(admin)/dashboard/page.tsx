'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { PRIMARY_TWO } from '@/constant/Colors';
import StatisticsCard from '@/components/stats/StatisticsCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Title, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import RecentRegisteredMembers from '@/components/dashboard/RecentRegisteredMembers';
import DoughnutChart from '@/components/DoughnutChart';
import LineChart from '@/components/LineChart';
import { AdminDashboardStatResponse, useGetAdminDashboardStatLazyQuery } from '@/graphql/__generated__/graphql';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import CustomSearch from '@/components/custom-select';
import { Select, SelectItem } from '@nextui-org/react';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Title, Filler);


const AdminDashboard = () => {
  const [value, setValue] = React.useState(new Set([]));
  const [adminStats, setAdminStats] = useState<AdminDashboardStatResponse|any>()
  const user = useSelector((state: RootState) => state.auth.userData.user)
  const [selectValue, setSelectValue] = useState<string>()

  const [getAdminStats, {loading}] = useGetAdminDashboardStatLazyQuery({fetchPolicy: 'no-cache'})

  const revByCategory = {
    labels: ['Events', 'Dues', 'Others'],
    datasets: [
        {
            data: [
              adminStats?.revByCategory?.events,
              adminStats?.revByCategory?.dues,
              adminStats?.revByCategory?.others
            ],
            backgroundColor: [
                '#25A248',
                '#F8C308',
                '#4E2444',
            ],
            hoverBackgroundColor: [
                '#25A248',
                '#F8C308',
                '#4E2444',
            ],
        },
    ],
  }

  const membershipGroup = {
    labels: ['Associate', 'Fellow', 'Full Member', 'Graduate', 'Student',  'Technologist'],
    datasets: [
      {
        data: adminStats?.membership ? [...adminStats.membership] : [0,0,0,0,0,0],
        backgroundColor: [
            '#25A248',
            '#F8C308',
            '#4E2444',
            '#26A69A',
            '#3949AB',
            '#FF9100',
        ],
        hoverBackgroundColor: [
          '#25A248',
          '#F8C308',
          '#4E2444',
          '#26A69A',
          '#3949AB',
          '#FF9100',
        ],
      },
    ],
  }

  useEffect(() =>{
    document.title = `Dashboard | NIA-kd`;
    (async () => {
      const res = await getAdminStats()
      setAdminStats(res.data?.getAdminDashboardStat)

    })()
  }, [getAdminStats])

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectValue(value)
    console.log(value)
  }


  console.log(adminStats)

  return (
    <div className='sm:px-12 xs:px-4 sm:pt-14 xs:pt-2 pb-12 w-full h-full overflow-y-auto'>
      <h1 className={`text-[${PRIMARY_TWO}] sm:text-xl xs:text-lg  font-semibold`}>Good afternoon, {user?.role}</h1>
      <div className='grid gap-8 sm:grid-cols-4 xs:grid-cols-1 pt-5 items-center'>
        <StatisticsCard title='Members' value={adminStats?.totalMember || 0} />
        <StatisticsCard title='Event held' value={adminStats?.eventHeld || 0} />
        <StatisticsCard title='Avg. attendance' value={`${adminStats?.avgAttendance || 0 }%`} />
        <StatisticsCard title='Total Revenue' value={`${'\u20a6'}${Intl.NumberFormat().format(adminStats?.revenue || 0)}`} />
      </div>
      <div className='w-full'>
        <div className='flex sm:flex-row xs:flex-col py-3 sm:h-84 xs:h-full gap-6'>
          <div className='sm:w-7/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Revenue</h1>
              <div>
                <Select
                  size='sm'
                  className='w-28'
                  defaultSelectedKeys={['month']}
                  items={[{id: 'month', label: 'Monthly'}, {id: 'year', label: 'Yearly'}]}
                  onChange={handleDurationChange}
                >
                  {(item) => (
                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div className='pt-3 h-full w-full'>
              <LineChart record={adminStats?.result} />
            </div>
          </div>
          <div className='sm:w-5/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4 pb-12'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Revenue by category</h1>
            </div>
            <div>
              <DoughnutChart type='revenue' data={revByCategory} />
            </div>
          </div>
        </div>
        <div className='flex sm:flex-row xs:flex-col sm:h-80 xs:h-full gap-6'>
          <div className='sm:w-5/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Membership category</h1>
            </div>
            <div className='pt-4'>
              <DoughnutChart type='membership' data={membershipGroup} />
            </div>
          </div>
          <div className='sm:w-7/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Recent registrations</h1>
              <div>
                <Link href={'/members'} className='text-sm'>See all</Link>
              </div>
            </div>
            <div className='pt-3'>
              <RecentRegisteredMembers />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard