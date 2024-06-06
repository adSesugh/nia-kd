'use client'

import React, { useEffect, useState } from 'react'
import { PRIMARY_TWO } from '@/constant/Colors';
import StatisticsCard from '@/components/stats/StatisticsCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Title, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import RecentRegisteredMembers from '@/components/dashboard/RecentRegisteredMembers';
import DoughnutChart from '@/components/DoughnutChart';
import LineChart from '@/components/LineChart';
import { AdminDashboardStat, useGetAdminDashboardStatLazyQuery } from '@/graphql/__generated__/graphql';
import { membershipGroup } from '@/lib/common';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Title, Filler);

const payments = {
  labels: ['Events', 'Dues', 'Others'],
  datasets: [
      {
          data: [64, 22, 12],
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
};

const membership = {
    labels: [...membershipGroup],
    datasets: [
      {
        data: [12, 10, 14, 2, 2, 7],
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
};

// const options = {
//   maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
//   cutoutPercentage: 250, // Adjust the inner radius to 50% (smaller hole)
//   layout: {
//     padding: {
//       left: 10,
//       right: 10,
//       top: 10,
//       bottom: 10,
//     },
//   },
//   legend: {
//       position: 'bottom' as const,
//       labels: {
//         boxWidth: 10,
//         boxRadius: 25
//       },
//   },
//   tooltips: {
//     callbacks: {
//       label: function (tooltipItem: { datasetIndex: string | number; index: string | number; }, data: { datasets: { [x: string]: any; }; }) {
//         const dataset = data.datasets[tooltipItem.datasetIndex];
//         const total = dataset.data.reduce((previousValue: any, currentValue: any) => previousValue + currentValue);
//         const currentValue = dataset.data[tooltipItem.index];
//         const percentage = Math.round((currentValue / total) * 100);
//         return percentage + '%';
//       },
//     },
//   },
// };

const AdminDashboard = () => {
  const [lineData, setLineData] = useState({
    labels: [12, 10, 14, 16, 20],
    datasets: [
      {
        label: 'Real-time Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const [adminStats, setAdminStats] = useState<AdminDashboardStat|any>()

  const [getAdminStats, {loading}] = useGetAdminDashboardStatLazyQuery({fetchPolicy: 'no-cache'})

  const revByCategory = {
    labels: ['Events', 'Dues', 'Others'],
    datasets: [
        {
            data: [
              adminStats?.revByCategory?.event || 0,
              adminStats?.revByCategory?.dues || 0,
              adminStats?.revByCategory?.others || 0
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

  console.log(adminStats?.membership)

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
  }, [])


  return (
    <div className='sm:px-12 xs:px-4 sm:pt-14 xs:pt-2 pb-12 w-full h-full overflow-y-auto'>
      <h1 className={`text-[${PRIMARY_TWO}] sm:text-xl xs:text-lg  font-semibold`}>Good afternoon, Jimoh</h1>
      <div className='grid gap-8 sm:grid-cols-4 xs:grid-cols-1 pt-5 items-center'>
        <StatisticsCard title='Members' value={adminStats?.totalMember || 0} />
        <StatisticsCard title='Event held' value={adminStats?.eventHeld || 0} />
        <StatisticsCard title='Avg. attendance' value={`${adminStats?.avgAttendance || 0 }%`} />
        <StatisticsCard title='Total Revenue' value={`${'\u20a6'}${Intl.NumberFormat().format(adminStats?.revenue || 0)}`} />
      </div>
      <div className='w-full'>
        <div className='flex sm:flex-row xs:flex-col py-3 sm:h-80 xs:h-full gap-6'>
          <div className='sm:w-7/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Revenue</h1>
              <div>
                <span>Month</span>
              </div>
            </div>
            <div className='flex pt-3 h-full w-full'>
              <LineChart />
            </div>
          </div>
          <div className='sm:w-5/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4 pb-16'>
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