import React from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'

const Breadcrumb = () => {
    return (
        <div className={styles.breadcrumb}>
            <div className='flex sm:flex-row xs:flex-col h-full sm:px-28 xs:px-6 -pt-20'>
                <div className='flex sm:w-1/2 xs:w-full text-white h-full items-center'>
                    <div className='flex flex-col justify-start sm:h-32 xs:h-44 xs:pt-6 sm:pt-0'>
                        <p className='pb-2' data-aos="fade-left">ABOUT US</p>
                        <blockquote className='sm:w-2/3 xs:w-full text-[#F3ECE2] sm:text-[20px] xs:text-sm italic leading-8' data-aos="fade-left">{'"Beyond Blueprints: The Evolution of Architectural Community in Kaduna"'}</blockquote>
                        <div className='pt-8'>
                            <Link href={'/about'} className={styles.aboutMore}>Discover more</Link>
                        </div>
                    </div>
                </div>
                <div className='flex sm:w-1/2 xs:w-full text-white h-full items-center'>
                    <div className='sm:w-11/12 xs:w-full xs:text-sm sm:text-[16px] leading-6 font-normal' data-aos="fade-left">The Nigeria Institute of Architects (NIA) Kaduna State Chapter was inaugurated on 11th of November 1972 as the then Northern Central State Chapter with a membership of 24, in line with the Vision of the Institute which is to attain excellence in the creative management of the physical environment and the Mission which is to mobilize informed membership for quickly service.</div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb