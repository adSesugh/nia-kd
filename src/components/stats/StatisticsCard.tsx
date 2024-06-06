import React from 'react'

type CardProps = {
    title: string
    value: number | string
}
const StatisticsCard: React.FC<CardProps> = ({ title, value }) => {
    return (
        <div className='flex flex-col h-28 rounded-2xl bg-white p-6 justify-center shadow-small'>
            <div className='pb-4 text-[#5E5959]'><h1>{title}</h1></div>
            <span className='text-2xl font-semibold'>{value}</span>
        </div>
    )
}

export default StatisticsCard