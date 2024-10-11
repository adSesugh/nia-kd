import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

const Mission = () => {
  return (
    <div className={styles.missionSection}>
        <div className='flex sm:flex-row xs:flex-col justify-between items-center h-full sm:pb-12'>
            <div className='sm:w-1/2 xs:w-full'>
                <Image src={'/assets/images/mission.svg'} alt='Mission' width={367} height={377} />
            </div>
            <div className='flex flex-col sm:w-1/2 xs:w-full h-full justify-center'>
                <div className='flex flex-col items-end w-full'>
                  <h6 className='font-light text-[#E08D14] pb-1 xs:pt-3 text-left! sm:w-4/5 xs:full'>Mission</h6>
                  <p className='sm:text-[32px] xs:text-[20px] font-semibold sm:w-4/5 xs:full'>To mobilize informed membership for quality services.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mission