import { PRIMARY_TWO } from '@/constant/Colors'
import React from 'react'

type SubHeaderProps = {
    title: string
    subtitle: string | null
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className={`flex flex-col bg-[#1E1A1C] justify-center items-center pt-20 h-80`}>
            <h1 className='text-[40px] font-bold py-2 text-white'>{title}</h1>
            {subtitle && <span className='text-white'>{subtitle}</span>}
        </div>
    )
}

export default SubHeader