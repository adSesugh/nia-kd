import { PRIMARY_TWO } from '@/constant/Colors'
import React from 'react'
import generalBg from '@/assets/galleryBg.png'

type SubHeaderProps = {
    title: string
    subtitle: string | null,
    bgImg?: string
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, subtitle, bgImg='/assets/bg.png' }) => {
    return (
        <div className={`pt-20 h-80 object-cover`} style={{ backgroundImage: `url(${bgImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
            <div className='flex flex-col justify-center items-center h-full w-full'>
                <h1 className='text-[40px] font-bold py-2 text-white'>{title}</h1>
                {subtitle && <span className='text-white'>{subtitle}</span>}
            </div>
        </div>
    )
}

export default SubHeader