'use client'

import NIAFooter from '@/components/footer';
import SubHeader from '@/components/sub-header';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link'
import FeaturedImage from '@/assets/blog/feature.svg'
import { ArrowRight } from 'iconsax-react';
import { BlogCardType } from '@/types/blog';
import Blog1 from '@/assets/blog/archi.svg'
import Blog2 from '@/assets/blog/nav.svg'
import BlogCard from '@/components/blog/BlogCard';

const blogs: BlogCardType[] = [
  {
    id: 'sfsa',
    title: "Navigating the architectural maze",
    photoUrl: Blog2,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfsayr',
    title: "Archi’ 101: From Plan to building",
    photoUrl: Blog1,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfsahfj',
    title: "Navigating the architectural maze",
    photoUrl: Blog2,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfsssda',
    title: "Archi’ 101: From Plan to building",
    photoUrl: Blog1,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfsaou',
    title: "Navigating the architectural maze",
    photoUrl: Blog2,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfswawa',
    title: "Archi’ 101: From Plan to building",
    photoUrl: Blog1,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfsawda',
    title: "Navigating the architectural maze",
    photoUrl: Blog2,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfspioa',
    title: "Archi’ 101: From Plan to building",
    photoUrl: Blog1,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  },
  {
    id: 'sfsaug',
    title: "Navigating the architectural maze",
    photoUrl: Blog2,
    summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
    published: 'Oct 20, 2023',
    readTime: '5 mins read'
  }
]

const Blog: NextPage = () => {
  return (
    <div>
      <SubHeader title='Blog' subtitle={''} />
      <div className='w-full h-full py-9 sm:px-28 xs:px-6 pb-24'>
        <h1 className='sm:text-[28px] xs:text-[20px] font-bold'>Featured Update</h1> 
        <div className='flex sm:flex-row xs:flex-col py-2'>
          <div className='sm:w-8/12 xs:w-full'>
            <Image 
              src={FeaturedImage} 
              alt='Featured'
              width={100}
              height={100}
              sizes='100vw'
              className='w-full rounded-2xl'
              style={{
                width: '100%',
                height: 'auto'
              }} 
            />
          </div>
          <div className='sm:w-4/12 xs:w-full sm:px-6 xs:px-0'>
            <p className='text-[14px] sm:space-x-2 xs:space-x-0 xs:pt-3 sm:pt-0'><span>Oct 20, 2023</span><span className='bg-[#F3ECE2] rounded-md py-1 px-1.5'>5 mins</span></p>
            <h1 className='sm:text-[28px] xs:text-[20px] font-semibold'>The role of nature in Architecture</h1>
            <p className='leading-2 text-[14px] py-2'>The Nigerian Institute of Architects (NIA) was founded on the 1st of April 1960 as an association of independent professional architects with the aims and objectives of...</p>
            <Link href={'/'} className='flex space-x-2 items-center'>
              <span className='font-medium text-[14px]'>Read more</span>
              <ArrowRight variant='Outline' size={16} color='black' />
            </Link>
          </div>
        </div>
        <div className='py-3 mt-4'>
          <h1 className='text-[24px] font-semibold'>Other posts</h1>
          <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-8'>
              {blogs.map((blog: BlogCardType, index: number) => (
                <BlogCard 
                  id={blog.id}
                  photoUrl={blog.photoUrl}
                  title={blog.title}
                  published={blog.published}
                  readTime={blog.readTime}
                  summary={blog.summary}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog