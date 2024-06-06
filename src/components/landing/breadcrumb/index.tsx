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
                        <blockquote className='sm:w-2/3 xs:w-full text-[#F3ECE2] sm:text-[20px] xs:text-sm italic' data-aos="fade-left">{'"Beyond Blueprints: The Evolution of Architectural Community in Kaduna"'}</blockquote>
                        <div className='pt-8'>
                            <Link href={'/about'} className={styles.aboutMore}>Discover more</Link>
                        </div>
                    </div>
                </div>
                <div className='flex sm:w-1/2 xs:w-full text-white h-full items-center'>
                    <p className='sm:w-11/12 xs:w-full xs:text-sm sm:text-[16px]' data-aos="fade-left">The Nigerian Institute of Architects Kaduna Chapter was founded on the 1st of April 1960, as an association of independent professional architects with the aim of fostering friendship amongst members, cater for their welfare and establish mutual support and cooperation amongst them.
From a modest 13 members at inauguration.</p>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb