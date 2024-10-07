'use client'

import React from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

const Breadcrumb = () => {
    return (
        <div className={styles.breadcrumb}>
            <div className='flex sm:flex-row xs:flex-col h-full sm:px-28 xs:px-6 -pt-20'>
                <div className='flex sm:w-1/2 xs:w-full text-white h-full items-center'>
                    <div className='flex flex-col justify-start xs:pt-6 sm:pt-0'>
                        <p className='pb-2 text-[#E08D14] text-sm'>ABOUT US</p>
                        <p className='w-full text-[#F3ECE2] sm:text-[28px] xs:text-sm py-3'>Beyond Blueprints: The Evolution</p>
                        <div className='w-full text-[#F3ECE2] sm:text-[28px] xs:text-sm py-3'>of Architectural Community in Kaduna</div>
                        <div className='flex pt-8 space-x-2 items-center'>
                            <Link href={'/about'} className={'text-[#E08D14] border-b border-[#E08D14] pb-1'}>Discover more</Link>
                            <ArrowRight size={16} color='#E08D14' />
                        </div>
                    </div>
                </div>
                <div className='flex sm:w-1/2 xs:w-full text-white h-full items-center'>
                    <div className='sm:w-11/12 xs:w-full xs:text-sm sm:text-[14px] leading-6 font-normal text-gray-200' data-aos="fade-left">The Nigerian Institute of Architects Kaduna Chapter was founded on the 1st of April 1960, as an association of independent professional architects with the aim of fostering friendship amongst members, cater for their welfare and establish mutual support and cooperation amongst them.
                    From a modest 13 members at inauguration.</div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb