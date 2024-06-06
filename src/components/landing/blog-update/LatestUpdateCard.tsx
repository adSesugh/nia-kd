import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

type UpdateProps = {
    photoUrl: string
    title: string
    published_date: string 
}

const LatestUpdateCard: React.FC<UpdateProps> = ({ photoUrl, title, published_date }) => {
  return (
    <div className={styles.blogUpdateCard}>
        <Image src={photoUrl} alt={title.replaceAll(' ', '-')} width={379} height={295} />
        <div className='px-1 py-4'>
            <span className='text-[12px] text-[#1E1A1C] py-1'>{published_date}</span>
            <h1 className='py-1 font-medium text-[15px] w-5/6'>{title}</h1>
        </div>
    </div>
  )
}

export default LatestUpdateCard