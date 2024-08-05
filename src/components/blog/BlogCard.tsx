import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { BlogCardType } from '@/types/blog'
import moment from 'moment'

const BlogCard: React.FC<BlogCardType> = ({ id, featuredImage, title, createdAt, summary, readTime }) => {
    return (
        <Link href={`/blog/${id}`} className='rounded-2xl overflow-hidden shadow-xl'>
            <figure>
                <img 
                    src={featuredImage} 
                    alt={title.replaceAll(' ', '-')} 
                    sizes="100vw" 
                    className='h-72 min-w-full'
                />
            </figure>
            <div className='bg-white p-3'>
                <div className='py-2'>
                    <div className='py-2'>
                        <span className='text-[12px]'>{moment(createdAt).format('LL')}</span>
                    </div>
                    <h1 className='font-medium'>{title}</h1>
                    <p className='text-[13px]' dangerouslySetInnerHTML={{ __html: summary}}></p>
                    <div className='divide divide-x-2 space-x-2 mt-2'>
                        <span className='text-[12px] text-[#E08D14]'>{readTime}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard