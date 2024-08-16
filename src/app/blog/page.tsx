'use client'

import SubHeader from '@/components/sub-header';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FeaturedImage from '@/assets/blog/feature.svg'
import { ArrowRight } from 'iconsax-react';
import { BlogCardType } from '@/types/blog';
import BlogCard from '@/components/blog/BlogCard';
import { useGetBlogsLazyQuery } from '@/graphql/__generated__/graphql';
import moment from 'moment';

const Blog: NextPage = () => {
  const [blogs, setBlogs] = useState<any>([])

  const [getBlogs, {loading}] = useGetBlogsLazyQuery({fetchPolicy: 'no-cache'})

  useEffect(()=> {
    document.title = 'Blogs | NIA-Kd';
    (async() => {
      const blogRes = (await getBlogs()).data
      setBlogs(blogRes?.getBlogs)
    })()
  }, [])

  return (
    <div>
      <SubHeader title='Blog' subtitle={''} />
      <div className='w-full h-full py-9 sm:px-28 xs:px-6 pb-24'>
        <h1 className='sm:text-[28px] xs:text-[20px] font-bold'>Featured Update</h1> 
        <div className='flex sm:flex-row xs:flex-col py-2'>
          <div className='sm:w-8/12 xs:w-full'>
            <div className='w-full h-full'>
              <img 
                src={blogs?.[0]?.featuredImage || FeaturedImage}  
                alt="Featured" 
                sizes="100vw" 
                className='sm:h-[33rem] xs:h-[20rem] w-full rounded-2xl object-fit'
              />
            </div>
          </div>
          <div className='sm:w-4/12 xs:w-full sm:px-6 xs:px-0'>
            <p className='text-[14px] sm:space-x-2 xs:space-x-0 xs:pt-3 sm:pt-0'><span>{moment(blogs?.[0]?.createdAt).format('LL')}</span><span className='bg-[#F3ECE2] rounded-md py-1 px-1.5'>5 mins</span></p>
            <h1 className='sm:text-[28px] xs:text-[20px] font-semibold'>{blogs?.[0]?.title || 'The role of nature in Architecture'}</h1>
            <p className='leading-2 text-[14px] py-2' dangerouslySetInnerHTML={{ __html: blogs?.[0]?.summary}}></p>
            <Link href={`/blog/${blogs?.[0]?.id}`} className='flex space-x-2 items-center'>
              <span className='font-medium text-[14px]'>Read more</span>
              <ArrowRight variant='Outline' size={16} color='black' />
            </Link>
          </div>
        </div>
        <div className='py-3 mt-4'>
          <h1 className='text-[24px] font-semibold'>Other posts</h1>
          <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-8'>
              {blogs?.map((blog: BlogCardType, index: number) => (
                <BlogCard 
                  id={blog.id}
                  featuredImage={blog.featuredImage as string}
                  title={blog.title}
                  createdAt={blog.createdAt}
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