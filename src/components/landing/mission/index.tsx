import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

const Mission = () => {
  return (
    <div className={styles.missionSection}>
        <div className='flex justify-between items-center w-full'>
            <div className='w-1/2'>
                <Image src={'/assets/images/mission.svg'} alt='Mission' width={367} height={377} />
            </div>
            <div className='flex flex-col w-1/2 h-full justify-center'>
                <h6>Mission</h6>
                <p className='text-[32px] font-medium w-4/5'>To mobilize informed membership for quality services.</p>
            </div>
        </div>
    </div>
  )
}

export default Mission