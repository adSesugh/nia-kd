'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../../TitleHeader'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import SearhbarWithIcon from '@/components/searhbar-with-icon'
import SelectFilter from '@/components/select-filter'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Member, useGetMembersLazyQuery } from '@/graphql/__generated__/graphql'
import { DotsThreeVertical } from '@phosphor-icons/react'
import { modelStatus } from '@/lib/common'
import { toast } from 'react-toastify'
import Image from 'next/image'

const Events = () => {
  const [events, setEvents] = useState<any>([])
  const [index, setIndex] = useState<number>(0)

  const loadingState = '' || events === 0 ? "loading" : "idle";

  useEffect(() => {
    //   ;(async () => {
    //       const res = await getMembers()
    //       if(res.error){
    //           toast.error(res.error.message)
    //       } else{
    //           setMembers(res?.data?.members)
    //       }
    //   })()
  
  }, [])

  const renderCell = React.useCallback((member: Member, columnKey: React.Key, index: number) => {
      const cellValue = member[columnKey as keyof Member];
      
  
      switch (columnKey) {
          case "id":
              setIndex(cur => cur + 1)
              return <span>{index}</span>;
          case "name":
              return (
                  <div>{member.firstName} {member.lastName}</div>
              )
          case "status":
              return (
                  <Chip className="capitalize" color={member.status === 'ACTIVE' ? 'success' : 'default'} size="sm" variant="flat">
                      <span className='text-[#0A7535]'>{cellValue}</span>
                  </Chip>
              );
          case "actions":
              return (
                  <div className="relative flex justify-end items-center gap-2">
                      <Dropdown>
                      <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <DotsThreeVertical size={40} className="text-default-300" color='#161314' />
                          </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                          <DropdownItem>View</DropdownItem>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem>Deactivate</DropdownItem>
                      </DropdownMenu>
                      </Dropdown>
                  </div>
              );
          default:
              return cellValue;
      }
  }, []);
  
  return (
    <div className='sm:px-12 xs:px-4'>
      <div className='flex justify-between items-center'>
          <TitleHeader title='Events' />
          <div className='sm:pt-14 xs:pt-2'>
            <Link 
              href={'/event/create'}
              className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
            >
              Create event
            </Link>
          </div>
      </div>
      <div className='pt-6 pb-4'>
          <Formik
              onSubmit={() => console.log('here...')}
              initialValues={{query: ''}}
          >
              {({values, touched, errors, handleBlur, handleChange, handleSubmit}) => (
                  <Form onSubmit={handleSubmit} className='flex sm:flex-row xs:flex-col sm:space-x-3 xs:space-x-0 xs:gap-3'>
                      <SearhbarWithIcon 
                          name='query' 
                          placeholder='Search members'
                          className={`flex sm:w-96 xs:w-full ${errors.query && touched.query ? 'ring-red-500': ''} pr-10`}
                      />
                      <SelectFilter nullValue='Status' name='membershipType' data={modelStatus} className='flex' />
                  </Form>
              )}
          </Formik>
      </div>
      <div>
          <Table aria-label="">
              <TableHeader>
                  <TableColumn key="id">S/N</TableColumn>
                  <TableColumn key="starts_at">Date</TableColumn>
                  <TableColumn key="event">Event</TableColumn>
                  <TableColumn key="type">Type</TableColumn>
                  <TableColumn key="tickets">Tickets sold</TableColumn>
                  <TableColumn key="status">Status</TableColumn>
                  <TableColumn key={'actions'}>.</TableColumn>
              </TableHeader>
              <TableBody
                  items={events ?? []}
                  loadingContent={<Spinner />}
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
                      <span>No events to display.</span>
                      <Link 
                        href={'/event/create'}
                        className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                      >
                        Create event
                      </Link>
                    </div>
                  )}
              >
                  {(item: Member) => (
                      <TableRow key={item?.id}>
                          {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                      </TableRow>
                  )}
              </TableBody>
          </Table>
      </div>
    </div>
  )
}

export default Events