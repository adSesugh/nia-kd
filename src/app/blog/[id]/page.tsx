'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BlogCardType } from '@/types/blog'
import Blog1 from '@/assets/blog/archi.svg'
import Blog2 from '@/assets/blog/nav.svg'
import BlogCard from '@/components/blog/BlogCard';
import { Blog, useGetBlogLazyQuery } from '@/graphql/__generated__/graphql'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

const blogs: BlogCardType[] = [
    {
      id: 'sfsa',
      title: "Navigating the architectural maze",
      featuredImage: Blog2,
      summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
      createdAt: 'Oct 20, 2023',
      readTime: '5 mins read'
    },
    {
      id: 'sfsayr',
      title: "Archi’ 101: From Plan to building",
      featuredImage: Blog1,
      summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
      createdAt: 'Oct 20, 2023',
      readTime: '5 mins read'
    },
    {
        id: 'sfsafhdfj',
        title: "Navigating the architectural maze",
        featuredImage: Blog2,
        summary: 'The architectural space can be quite complex and daunting if there is no one to properly guide and...',
        createdAt: 'Oct 20, 2023',
        readTime: '5 mins read'
      },
  ]

const BlogDetail = () => {
    const {id } = useParams()
    const [blog, setBlog] = useState<any>()
    const [getBlog, {loading}] = useGetBlogLazyQuery({fetchPolicy: 'no-cache'})
    const currentUrl = encodeURIComponent(window.location.href);

    // if (typeof window !== 'undefined') {
    //     const currentUrl = encodeURIComponent(window.location.href);
    //     // Use currentUrl for sharing
    //   }

    useEffect(() => {
        (async() => {
            const res = (await getBlog({
                variables: {
                    blogId: id
                }
            })).data
            setBlog(res?.getBlog)
        })()
    }, [id])
   
    return (
        <div className='h-full w-full px-28'>
            <div className='px-44'>
                <div className='mt-14'>
                    <h1 className='text-[25px] font-semibold pt-20'>{blog?.title}</h1>
                </div>
                <div className='flex space-x-2 items-center py-3'>
                    <img src='/assets/profile.png' className='h-7 w-7 rounded-full' />
                    <div>
                        <h2 className='font-semibold text-sm'>{blog?.user?.member?.firstName} {blog?.user?.member?.lastName}</h2>
                        <span className='text-[12px] text-[#6F6F6F]'>{blog?.user?.member?.membershipType?.name}</span>
                    </div>
                </div>
            </div>
            <div className='flex py-1 w-full items-center justify-center px-44'>
                <div className='relative h-96 pb-[56.25%] w-full rounded-xl'>
                    <Image 
                        src={blog.featuredImage as string}
                        layout='fill'
                        objectFit='cover'
                        alt={`${blog?.title}`}
                        className='rounded-2xl'
                    />
                </div>
            </div>
            <div className='flex justify-between px-44 pt-4'>
                <div className='w-9/12'>
                    <div className='space-y-2'>
                        <div dangerouslySetInnerHTML={{ __html: blog?.content}}></div>
                        {/* <p>Figma is a design platform for teams who build products together. Born on the Web, Figma helps the entire product team create and ship better designs. This event will help foster the need to innovate and be creative in the architectural space. It will be shown how a little creativity can do a lot to one’s output.</p>
                        <p>Figma is a design platform for teams who build products together. Born on the Web, Figma helps the entire product team create and ship better designs. This event will help foster the need to innovate and be creative in the architectural space. It will be shown how a little creativity can do a lot to one’s output.</p>
                        <h4 className='text-[20px] pt-2 font-medium'>Architecture and nature</h4>
                        <p>Figma is a design platform for teams who build products together. Born on the Web, Figma helps the entire product team create and ship better designs. This event will help foster the need to innovate and be creative in the architectural space. It will be shown how a little creativity can do a lot to one’s output.</p>
                        <p>Figma is a design platform for teams who build products together. Born on the Web, Figma helps the entire product team create and ship better designs. This event will help foster the need to innovate and be creative in the architectural space. It will be shown how a little creativity can do a lot to one’s output.</p> */}
                    </div>
                </div>
                <div className='w-3/12'>
                    <div className='flex flex-col items-end'>
                        <h4 className='text-[15px]'>Share on</h4>
                        <div className='flex space-x-2 py-2'>
                            <Link href={`http://www.twitter.com/intent/tweet?url=${currentUrl}&title=${blog?.title}`} target='_blank'>
                                <img src='/assets/twitter.svg' alt='Twitter' className='h-5 w-5' />
                            </Link>
                            <Link href={`http://www.facebook.com/sharer/sharer.php?u=${currentUrl}&title=${blog?.title}`} target='_blank'>
                                <img src='/assets/facebook.svg' alt='Facebook' className='h-5 w-5' />
                            </Link>
                            <Link href={`http://plus.google.com/share?url=${currentUrl}&title=${blog?.title}`}>
                                <img src='/assets/Linkedin.svg' alt='LinkedIn' className='h-5 w-5' />
                            </Link>
                            <CopyToClipboard text={`${window.location.href}`} onCopy={() => toast.success(`${window.location.href} copied!`)}>
                                <img src='/assets/Link.svg' alt='Link' className='h-5 w-5 cursor-pointer' />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <h2 className='text-[18px] font-medium'>More posts like this</h2>
                <div className='pt-3 grid grid-cols-3 w-full mb-24 gap-8'>
                    {blogs.map((blog: BlogCardType, index: number) => (
                        <BlogCard 
                            id={blog.id}
                            featuredImage={blog.featuredImage}
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
    )
}

export default BlogDetail