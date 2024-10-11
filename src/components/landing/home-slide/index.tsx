'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'
import { Play, Pause } from 'iconsax-react'
import Aos from 'aos'

const messages = [
  {
    title: 'Welcome to Nigerian Institute Of Architects. Kaduna Chapter',
    subtitle: 'Inspiring generations of architects in Kaduna to dream big, build beyond boundaries and shape the skylines of tomorrow.',
    slider: '/assets/slider/1.jpg'
  },
  {
    title: 'Welcome to Nigerian Institute Of Architects. Kaduna Chapter',
    subtitle: 'Inspiring generations of architects in Kaduna to dream big, build beyond boundaries and shape the skylines of tomorrow.',
    slider: '/assets/slider/2.jpg'
  },
  {
    title: 'Welcome to Nigerian Institute Of Architects. Kaduna Chapter',
    subtitle: 'Inspiring generations of architects in Kaduna to dream big, build beyond boundaries and shape the skylines of tomorrow.',
    slider: '/assets/slider/3.jpg'
  }
]

const HomeSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMessage, setSelectedMessage] = useState(messages[currentIndex])

  useEffect(() => { Aos.init() },[])

  setInterval(() => {
    if(currentIndex >= 0 && currentIndex < (messages.length - 1)) {
      setCurrentIndex(currentIndex + 1)
      setSelectedMessage(messages[currentIndex + 1])
    }
    else {
      setCurrentIndex(0)
      setSelectedMessage(messages[0])
    }
  }, 10000)

  return (
    <div className={`${styles.slideSection} transition-background ease-in-out delay-150`} style={{ backgroundImage: `url(${selectedMessage.slider})`}}>
      <div className='flex justify-between h-full w-full bg-gradient-to-tr from-transparent to-black/60'>
        <div className='flex sm:pl-28 xs:pl-6 sm:w-4/6 xs:w-full h-full justify-start items-center'>
          <div className='sm:w-3/5 xs:w-full sm:pt-16 xs:pt-24'>
            <h1 className='sm:text-[48px] xs:text-[30px] font-bold text-white sm:leading-[60px] xs:leading-[40px] sm:pb-0 xs:pb-4' data-aos="fade-right">{selectedMessage?.title}</h1>
            <span className='text-white font-normal' data-aos="fade-up">{selectedMessage?.subtitle}</span>
            <div className='sm:pt-10 xs:pt-10'>
              <Link href={'/auth/register'} className={styles.discoverMore}>Join NIAKD</Link>
            </div>
          </div>
        </div>
        <div className='sm:w-2/6 xs:w-0 h-full'></div>
      </div>
      <div className={`${styles.timerSection} sm:-mt-16 xs:-mt-20`}>
              {/* <Play color='#FFFFFF' size={16} variant='Bold' className='cursor-pointer' /> */}
        <div className={`flex h-8 w-6 ${currentIndex === 0 && 'border-b-2 border-[#E08D14] w-6'} justify-center items-center select-none cursor-pointer`}>
          <span className={`text-[14px] ${currentIndex === 0 && 'text-[#E08D14]'}`}>01</span>
        </div>
        <div className={`flex h-8 w-6 ${currentIndex === 1 && 'border-b-2 border-[#E08D14] w-6'} justify-center items-center select-none cursor-pointer`}>
          <span className={`text-[14px] ${currentIndex === 1 && 'text-[#E08D14]'}`}>02</span>
        </div>
        <div className={`flex h-8 w-6 ${currentIndex === 2 && 'border-b-2 border-[#E08D14] w-6'} justify-center items-center select-none cursor-pointer`}>
          <span className={`text-[14px] ${currentIndex === 2 && 'text-[#E08D14]'}`}>03</span>
        </div>
      </div>
    </div>
  )
}

export default HomeSlider