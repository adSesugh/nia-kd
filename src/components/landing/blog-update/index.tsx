import React from 'react'
import styles from '@/styles/home.module.css'
import LatestUpdateCard from './LatestUpdateCard'

const updateArr = [
    {
        photoUrl: 'http://localhost:3000/assets/images/image-13.svg',
        title: 'Award of excellence and most exceptional contribution.',
        published_date: 'Dec 22, 2023' 
    },
    {
        photoUrl: 'http://localhost:3000/assets/images/image-14.svg',
        title: 'The Nigerian Institute of Architects Inducts new fellows in Lagos',
        published_date: 'Dec 22, 2023' 
    },
    {
        photoUrl: 'http://localhost:3000/assets/images/image-15.svg',
        title: 'The Nigerian Institute of Architects Inducts new fellows in Lagos',
        published_date: 'Dec 22, 2023' 
    },
]

const BlogUpdate = () => {
  return (
    <div className={styles.blogUpdate}>
        <h1 className='text-center w-full font-semibold text-[28px] py-4'>Latest Updates</h1>
        <div className='flex justify-between pt-3 pb-10 w-full'>
            {updateArr.map((item, index) => (
                <LatestUpdateCard {...item} key={index} />
            ))}
        </div>
    </div>
  )
}

export default BlogUpdate