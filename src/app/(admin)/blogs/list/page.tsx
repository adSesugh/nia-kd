'use client'

import BlogList from '@/components/blog/BlogList'
import PublishedBlog from '@/components/blog/PublishedBlog'
import DraftedBlog from '@/components/blog/DraftedBlog'
import { useEffect, useState } from 'react'
import TitleHeader from '../../TitleHeader'
import Link from 'next/link'

const Blog = () => {
    const [selectedTab, setSelectedTab] = useState('all')

    useEffect(() => {
        document.title = `Blog | NIA-Kd`
    }, [])

    return (
        <div className='sm:px-12 xs:px-4 h-full overflow-y-auto'>
            <div className='flex justify-between items-center'>
                <TitleHeader title='Blogs' />
                <div className='sm:pt-14 xs:pt-2'>
                    <Link 
                        href={'/blogs/create'}
                        className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                      >
                        New Blog
                    </Link>
                </div>
            </div>
            <div className='pt-5 pb-3'>
                <div className='flex pb-2 border-b border-[#DBDBDB] w-full'>
                    <div className='-mb-2.5 space-x-6'>
                    <button className={selectedTab === 'all' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('all')}>All</button>
                    <button className={selectedTab === 'published' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('published')}>Published</button>
                    <button className={selectedTab === 'draft' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('draft')}>Draft</button>
                    </div>
                </div>
                {selectedTab === 'all' && <BlogList />}
                {selectedTab === 'published' && <PublishedBlog />}
                {selectedTab === 'draft' && <DraftedBlog />}
            </div>
        </div>
    )
}

export default Blog