import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { BlogCardType } from '@/types/blog'

const BlogCard: React.FC<BlogCardType> = ({ id, photoUrl, title, published, summary, readTime }) => {
    return (
        <Link href={`/blog/${id}`} className='rounded-2xl overflow-hidden shadow-xl'>
            <figure>
                <Image 
                    src={photoUrl} 
                    alt={title.replaceAll(' ', '-')}
                    sizes="100vw"
                    width={100}
                    height={100}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }} 
                    className='w-full rounded-t-2xl'
                />
            </figure>
            <div className='bg-white p-3'>
                <div className='py-2'>
                    <div className='py-2'>
                        <span className='text-[12px]'>{published}</span>
                    </div>
                    <h1 className='font-medium'>{title}</h1>
                    <p className='text-[13px]'>{summary}</p>
                    <div className='divide divide-x-2 space-x-2 mt-2'>
                        <span className='text-[12px] text-[#E08D14]'>{readTime}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard