import React from 'react'
import styles from '@/styles/home.module.css'
import ShowcaseCard from './ShowcaseCard'
import { ArrowLeft, ArrowRight } from 'iconsax-react'
import Showcase3 from '@/assets/showcase/showcase-3.svg'
import Showcase2 from '@/assets/showcase/showcase-2.svg'
import Showcase1 from '@/assets/showcase/showcase-1.svg'

const Showcase = () => {
  return (
    <div className={styles.showcase}>
        <h1>Showcase</h1>
        <div>
            <h2>One platform to unite Us all.</h2>
        </div>
        <div className='gap-8 overflow-hidden mt-8'>
          <ShowcaseCard photoUrl={Showcase3} />
          <ShowcaseCard photoUrl={Showcase1} />
          <ShowcaseCard photoUrl={Showcase3} />
          <ShowcaseCard photoUrl={Showcase1} />
        </div>
        <div className='flex my-12 gap-3 justify-center items-center text-white'>
          <button className='flex justify-center items-center h-12 w-12 rounded-full border border-[#F3ECE2]'>
            <ArrowLeft variant='Outline' size={24} color='#F3ECE2' />
          </button>
          <button className='flex justify-center items-center h-12 w-12 rounded-full border border-[#F3ECE2]'>
            <ArrowRight variant='Outline' size={24} color='#F3ECE2' />
          </button>
        </div>
    </div>
  )
}

export default Showcase