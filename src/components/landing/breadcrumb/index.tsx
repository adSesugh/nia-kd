import React from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'

const Breadcrumb = () => {
    return (
        <div className={styles.breadcrumb}>
            <div className='flex  h-full px-28 -pt-20'>
                <div className='flex w-1/2 text-white h-full items-center'>
                    <div className='flex flex-col justify-start h-32'>
                        <p className='pb-2' data-aos="fade-left">ABOUT US</p>
                        <p className='w-2/3 text-[#F3ECE2] text-[24px]' data-aos="fade-left">{'"Beyond Blueprints: The Evolution of Architectural Community in Kaduna"'}</p>
                        <div className='pt-5'>
                            <Link href={'/about'} className={styles.aboutMore}>Discover more</Link>
                        </div>
                    </div>
                </div>
                <div className='flex w-1/2 text-white h-full items-center'>
                    <p className='w-11/12' data-aos="fade-left">The Nigerian Institute of Architects Kaduna Chapter was founded on the 1st of April 1960, as an association of independent professional architects with the aim of fostering friendship amongst members, cater for their welfare and establish mutual support and cooperation amongst them.
From a modest 13 members at inauguration.</p>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb