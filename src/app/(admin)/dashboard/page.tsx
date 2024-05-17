'use client'

import React, { useEffect } from 'react'
import { PRIMARY_TWO } from '@/constant/Colors';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data1: any = {
  labels: ['Dues', 'Events', 'Others'],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: [
        '#25A248',
        '#F8C308',
        '#4E2444',
      ]
    },
  ],
};

const data2: any = {
    labels: ['Fellows', 'Students', 'Graduate'],
    datasets: [
      {
        data: [12, 10, 14],
        backgroundColor: [
            '#25A248',
            '#F8C308',
            '#4E2444',
        ]
      },
    ],
};

const options = {
    maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
    cutoutPercentage: 50, // Adjust the inner radius to 50% (smaller hole)
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    legend: {
        display: true,
        position: 'bottom', // Position the legend at the bottom
    },
    tooltips: {
        callbacks: {
          label: function (tooltipItem: { datasetIndex: string | number; index: string | number; }, data: { datasets: { [x: string]: any; }; }) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const total = dataset.data.reduce((previousValue: any, currentValue: any) => previousValue + currentValue);
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = Math.round((currentValue / total) * 100);
            return percentage + '%';
          },
        },
    },
};

const AdminDashboard = () => {
  useEffect(() =>{
    document.title = `Dashboard | NIA-kd`
  }, [])
  return (
    <div className='sm:px-12 xs:px-4 sm:pt-14 xs:pt-2 pb-12 w-full h-full overflow-y-auto'>
      <h1 className={`text-[${PRIMARY_TWO}] sm:text-xl xs:text-lg  font-semibold`}>Good afternoon, Jimoh</h1>
      <div className='grid gap-8 sm:grid-cols-4 xs:grid-cols-1 pt-5 items-center'>
        <StatisticsCard title='Members' value={25} />
        <StatisticsCard title='Event held' value={3} />
        <StatisticsCard title='Avg. attendance' value={'75%'} />
        <StatisticsCard title='Total Revenue' value={`${'\u20a6'}${Intl.NumberFormat().format(120000)}`} />
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
          </div>
          <div className='sm:w-5/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Revenue by category</h1>
            </div>
            <div>
              <Doughnut data={data1} height={230} width={230} options={options} />
            </div>
          </div>
        </div>
        <div className='flex sm:flex-row xs:flex-col sm:h-80 xs:h-full gap-6'>
          <div className='sm:w-5/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Membership category</h1>
            </div>
            <div> 
              <Doughnut data={data2} height={230} width={230} options={options} />
            </div>
          </div>
          <div className='sm:w-7/12 xs:w-full h-full rounded-2xl bg-white shadow-small p-4'>
            <div className='flex justify-between'>
              <h1 className='text-[16px] font-medium'>Recent registrations</h1>
              <div>
                <span>see all</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard