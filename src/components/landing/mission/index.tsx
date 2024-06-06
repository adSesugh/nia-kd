import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

const Mission = () => {
  return (
    <div className={styles.missionSection}>
        <div className='flex sm:flex-row xs:flex-col justify-between items-center h-full'>
            <div className='sm:w-1/2 xs:w-full'>
                <Image src={'/assets/images/mission.svg'} alt='Mission' width={367} height={377} />
            </div>
            <div className='flex flex-col sm:w-1/2 xs:w-full h-full justify-center'>
                <h6 className='xs:font-bold sm:font-normal'>Mission</h6>
                <p className='sm:text-[32px] xs:text-[16px] font-normal sm:w-4/5 xs:full'>To mobilize informed membership for quality services.</p>
            </div>
        </div>
    </div>
  )
}

export default Mission