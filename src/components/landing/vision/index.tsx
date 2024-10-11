import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

const NIAVision = () => {
    return (
        <div className={`${styles.missionSection} sm:-mt-16 xs:mt-10`}>
            <div className='flex sm:flex-row xs:flex-col-reverse justify-between items-center'>
                <div className='flex flex-col sm:w-1/2 xs:w-full h-full justify-center'>
                    <h6 className='font-light text-[#E08D14] pb-1 xs:pt-3'>Vision</h6>
                    <p className='sm:text-[32px] xs:text-[20px] font-semibold sm:w-4/5 xs:w-full'>To attain excellence in the creative management of the physical environment.</p>
                </div>
                <div className='flex sm:w-1/2 xs:w-full justify-end'>
                    <Image src={'/assets/images/vision.svg'} alt='Mission' width={367} height={377} />
                </div>
            </div>
        </div>
    )
}

export default NIAVision