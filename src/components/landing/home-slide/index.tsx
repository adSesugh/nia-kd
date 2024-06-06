'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'
import { Play, Pause } from 'iconsax-react'
import Aos from 'aos'

const messages = [
  {
    title: 'Building Excellence, Inspiring Generations.',
    subtitle: 'Inspiring generations of architects in Kaduna to dream big, build beyond boundaries and shape the skylines of tomorrow.'
  },
  {
    title: '02 Building Excellence, Inspiring Generations.',
    subtitle: '02 Inspiring generations of architects in Kaduna to dream big, build beyond boundaries and shape the skylines of tomorrow.'
  },
  {
    title: '03 Building Excellence, Innovative Groups.',
    subtitle: '03 Inspiring generations of architects in Kaduna to dream big, build beyond boundaries and shape the skylines of tomorrow.'
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
  }, 50000)

  return (
    <div className={styles.slideSection}>
      <div className='flex justify-between h-full w-full bg-gradient-to-tr from-transparent to-black/60'>
        <div className='flex sm:pl-28 xs:pl-6 sm:w-4/6 xs:w-full h-full justify-start items-center'>
          <div className='sm:w-3/5 xs:w-full sm:pt-20 xs:pt-10'>
            <h1 className='sm:text-[48px] xs:text-[20px] font-bold text-white' data-aos="fade-right">{selectedMessage?.title}</h1>
            <span className='text-white font-normal' data-aos="fade-up">{selectedMessage?.subtitle}</span>
            <div className='pt-10'>
              <Link href={'/events'} className={styles.discoverMore}>Discover more</Link>
            </div>
            <div className={styles.timerSection}>
              <Play color='#FFFFFF' size={16} variant='Bold' className='cursor-pointer' />
              <div className={`flex rounded-full h-8 w-8 ${currentIndex === 0 && 'border-2 border-white'} justify-center items-center select-none cursor-pointer`}>
                <span className='text-[14px]'>01</span>
              </div>
              <div className={`flex rounded-full h-8 w-8 ${currentIndex === 1 && 'border-2 border-white'} justify-center items-center select-none cursor-pointer`}>
                <span className='text-[14px]'>02</span>
              </div>
              <div className={`flex rounded-full h-8 w-8 ${currentIndex === 2 && 'border-2 border-white'} justify-center items-center select-none cursor-pointer`}>
                <span className='text-[14px]'>03</span>
              </div>
            </div>
          </div>
        </div>
        <div className='sm:w-2/6 xs:w-0 h-full'></div>
      </div>
    </div>
  )
}

export default HomeSlider