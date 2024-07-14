'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import Image from 'next/image'
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Resource, useCreateResourcesMutation, useDeleteResourceMutationMutation, useGetResourcesLazyQuery } from '@/graphql/__generated__/graphql'
import moment from 'moment'
import { SearchNormal } from 'iconsax-react'
import { formatFileSize, readFileAsDataURL } from '@/lib/helpers'
import { CaretDown, Trash } from '@phosphor-icons/react'
import { toast } from 'react-toastify'

const ResourceList = () => {
  let [index, setIndex] = useState<number>(0)
  const [resources, setResources] = useState<any>([])
  const [resourcesHolder, setResourcesHolder] = useState<any>([])
  const [getResources, {loading}] = useGetResourcesLazyQuery({fetchPolicy: 'no-cache'})
  const [createResource, {loading: createLoading}] = useCreateResourcesMutation()
  const [deleteReource] = useDeleteResourceMutationMutation()

  const loadingState = loading || resources === 0 ? "loading" : "idle";

  useEffect(() => {
    document.title = `Resources | NIA-Kd`;
    (async () => {
      const res = await getResources()
      setResources(res.data?.getResources)
      setResourcesHolder(res.data?.getResources)
    })()
  }, [getResources])

  const renderCell = React.useCallback((resource: Resource, columnKey: React.Key) => {
    const cellValue = resource[columnKey as keyof Resource];
    
    switch (columnKey) {
        case "id":
          return <span>{++index}</span>;
        case "name":
          return (
            <div>{resource.name.split('.')[0]}</div>
          )
        case "size":
          return (
            <div>{formatFileSize(resource.fileSize as number)}</div>
          )
        case "type":
            return (
              <div>{resource.fileType}</div>
            )
        case "uploaded":
            return (
                <div className='text-sm'>{moment(resource.createdAt).format('LL')}</div>
            )
        case "actions":
            return (
                <div className="flex justify-end items-center gap-3">
                    <Trash onClick={() => removeResource(resource?.id)} size={20} color='#C70F0F' className='cursor-pointer' />
                </div>
            );
        default:
            return cellValue;
    }
  }, []);

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
  const removeResource = async(resourceId: string) => {
    const res = await deleteReource({
      variables: {
        resourceId
      }
    })

    if(res.data?.deleteResource){
      const resoures = await getResources()
      setResources(resoures.data?.getResources)
      setResourcesHolder(resoures.data?.getResources)
    }
  }

  return (
    <div className='sm:px-12 xs:px-4 h-full overflow-y-auto'>
      <div className='flex justify-between items-center'>
        <TitleHeader title='Resources' />
        <div className='sm:pt-10 xs:pt-2'>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            accept=".pdf"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              console.log(event.target.files)
                if (event.target.files) {
                  const newFiles = Array.from(event.target.files).filter((file) =>
                    file.type === 'application/pdf'
                  ).map((file) =>
                      Object.assign(file)
                  );

                  let count: number = 0
                  
                  Array.from(event.target.files).forEach(async(resr: File, index: number) => {
                    const contentURL = await readFileAsDataURL(resr)
                    try {
                      const upres = (await createResource({
                        variables: {
                          input: {
                            name: resr.name,
                            resourcePath: contentURL as string,
                            fileSize: resr.size,
                            fileType: resr.type.split('/')[1] as string
                          }
                        }
                      })).data

                      count++

                      if(upres?.createResources?.success) {
                        if(Number(newFiles.length) === count) {
                          toast.success('Resource upload completed')
                        } else {
                          toast.success('Resource added')
                        }
                        const res = (await getResources()).data
                        setResources(res?.getResources)
                        setResourcesHolder(res?.getResources)
                      }
                    } catch (error: any) {
                      toast.error(error)
                    }
                  })
                }
            }}
          />
           <label aria-disabled={loading} aria-label='file-upload' htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
            <div
                className='flex px-6 py-2.5 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
              >
                {createLoading ? 'Please wait...' : 'Upload'}
              </div>
          </label>
        </div>
      </div>
      <div className='flex sm:flex-row xs:flex-col justify-between pt-6 w-full gap-4'>
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
      <div className='pt-4'>
        <Table aria-label="">
          <TableHeader>
            <TableColumn key="id">S/N</TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="type">Type</TableColumn>
            <TableColumn key="size">Size</TableColumn>
            <TableColumn key="uploaded">Uploaded</TableColumn>
            <TableColumn key={'actions'}>.</TableColumn>
          </TableHeader>
          <TableBody
          items={resources || []}
          loadingContent={<Spinner color='default' />}
          loadingState={loadingState}
          emptyContent={(
            <div className='flex flex-col items-center justify-center gap-3'>
              <Image 
                src={'/assets/event-empty.png'} 
                alt='empty state' 
                width={10} 
                height={10} 
                sizes='100vw'
                style={{
                  width: '5%',
                  height: 'auto'
                }}
              />
              <span>No resource to display.</span>
            </div>
          )}
          >
            {(item: Resource) => (
                <TableRow key={item?.id} className='border-b last:border-b-0'>
                    {(columnKey) => <TableCell className='py-3.5'>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ResourceList