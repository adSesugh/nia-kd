'use client'

import TitleHeader from '@/app/(admin)/TitleHeader';
import { Resource, useGetResourcesLazyQuery } from '@/graphql/__generated__/graphql';
import { Spinner } from '@nextui-org/react';
import { CaretDown } from '@phosphor-icons/react';
import { SearchNormal } from 'iconsax-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
const PdfViewer = dynamic(() => import('@/components/PdfViewer'), { ssr: false });


const MemberResource = () => {
  const [resources, setResources] = useState<any>([])
  const [resourcesHolder, setResourcesHolder] = useState<any>([])

  const [getResources, {loading}] = useGetResourcesLazyQuery({fetchPolicy: 'no-cache'})

  useEffect(() => {
    document.title = `Resources | NIA-Kd`;
    (async () => {
      const res = await getResources()
      setResources(res.data?.getResources)
      setResourcesHolder(res.data?.getResources)
    })()
  }, [getResources])
  
  const searchResources = (query: string) => {
    if(query.length === 0) {
      setResources(resourcesHolder)
    } else {
      const filteredResources = resources?.filter((resource: Resource) => {
        return resource.name.toLowerCase().includes(query)
      })
      setResources(filteredResources)
    }
  }

  console.log()

  if(loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner size='lg' color='default' />
      </div>
    )
  }
  
  return (
    <div className='sm:px-12 xs:px-4 h-full overflow-y-auto w-full'>
      <div className='flex items-center -mt-8'>
        <TitleHeader title='Resources' />
      </div>
      <div className='w-full'>
        <div className='flex sm:flex-row xs:flex-col justify-between items-center pt-6 w-full gap-4'>
            <div className='relative rounded-md shadow-sm sm:w-2/5 xs:w-full'>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <SearchNormal variant='Outline' size={20} color='gray' />
              </div>
              <input 
                  name='query'
                  placeholder='Search resources'
                  type='search'
                  className={`pr-3 pl-10 block w-full rounded-md h-11 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
                  onChange={(e) => searchResources(e.target.value)}
              />
            </div>
            <div>
              <div className='flex space-x-2 items-center'>
                <span className='text-[#787878] text-sm'>Sort by</span>
                <div className='flex space-x-1 items-center'>
                  <span className='text-sm text-[#161314]'>Recently added</span>
                  <CaretDown size={16} />
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='w-full py-6'>
        <div className='grid sm:grid-cols-5 xs:grid-cols-1 gap-x-10 gap-y-5'>
          {resources?.map((resource: any) => (
            <PdfViewer key={resource.id} fileUrl={resource.resourcePath} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemberResource