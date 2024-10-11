'use client'

import SubHeader from '@/components/sub-header'
import React from 'react'
import data from '@/assets/data/galleries.json'
import GalleryCard from '@/components/GalleryCard'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'

const Gallery = () => {
    return (
        <div className='bg-[#1E1A1C] w-full h-full overflow-y-scroll'>
            <SubHeader title='Gallery' subtitle={'Explore our latest galleries'} />
            <div className='sm:px-32 xs:px-6 py-12 w-full'>
                {/* Proposed NIAKD secretariat  */}
                <div>
                    <h1 className='text-white text-lg my-2'>Proposed NIAKD Secretariat</h1>
                    <div className='grid sm:grid-cols-2 xs:grid-cols-1  gap-5'>
                        {data.secretariats.map((item: any) => (
                            <GalleryCard key={item.id} gallery={item} />
                        ))}
                    </div>
                </div>
                {/* NIAKD Other Exhibitions   */}
                <div className='pt-8'>
                    <h1 className='text-white text-lg my-2'>Other Exhibitions</h1>
                    <div className='grid sm:grid-cols-2 xs:grid-cols-1  gap-5'>
                        {data.galleries.map((gallery: any) => (
                            <GalleryCard key={gallery.id} gallery={gallery} />
                        ))}
                    </div>
                </div>
                <div className='pt-16 flex place-content-center'>
                    <Link href={'https://x.com/niakaduna?t=Rd-Hc5JbGsX7mK7epOvteQ&s=09'} target='_blank' className='bg-[#E08D14] rounded-3xl px-8 py-3'>
                        <div className='flex space-x-2 items-center'>
                            <span className='text-white font-light'>View more</span>
                            <ArrowRight size={16} color='#FFFFFF' />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Gallery