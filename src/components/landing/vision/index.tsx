import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

const NIAVision = () => {
    return (
        <div className={`${styles.missionSection} -mt-16`}>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col w-1/2 h-full justify-center'>
                    <h6>Vision</h6>
                    <p className='text-[32px] font-medium w-4/5'>To attain excellence in the creative management of the physical environment.</p>
                </div>
                <div className='flex w-1/2 justify-end'>
                    <Image src={'/assets/images/vision.svg'} alt='Mission' width={367} height={377} />
                </div>
            </div>
        </div>
    )
}

export default NIAVision