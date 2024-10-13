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
                        <p className='pb-2 text-[#E08D14] text-sm font-light'>ABOUT US</p>
                        <p className='w-full text-[#F3ECE2] sm:text-[28px] xs:text-2xl font-medium sm:py-3 xs:pb-2'>Beyond Blueprints: The Evolution <span className='xs:flex sm:hidden'>of Architectural Community in Kaduna</span></p>
                        <div className='w-full text-[#F3ECE2] sm:text-[28px] xs:text-2xl font-medium sm:py-3 xs:pb-3 sm:flex xs:hidden'>of Architectural Community in Kaduna</div> 
                        <div className='sm:pt-8 xs:pt-4 space-x-2 items-center xs:hidden sm:flex'>
                            <Link href={'/about'} className={'text-[#E08D14] border-b border-[#E08D14] pb-[2px] font-light'}>Discover more</Link>
                            <ArrowRight size={16} color='#E08D14' />
                        </div>
                    </div>
                </div>
                <div className='flex sm:w-1/2 xs:w-full sm:py-0 xs:py-6 text-white h-full items-center'>
                    <div className='sm:w-11/12 xs:w-full leading-6 text-gray-200 font-light' data-aos="fade-left">The Nigerian Institute of Architects Kaduna Chapter was founded on the 1st of April 1960, as an association of independent professional architects with the aim of fostering friendship amongst members, cater for their welfare and establish mutual support and cooperation amongst them.
                    From a modest 13 members at inauguration.</div>
                </div>
                <div className='space-x-2 items-center pb-8 sm:hidden xs:flex'>
                    <Link href={'/about'} className={'text-[#E08D14] border-b border-[#E08D14] pb-[2px] font-light'}>Discover more</Link>
                    <ArrowRight size={16} color='#E08D14' />
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb