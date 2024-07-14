'use client'

import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import SearhbarWithIcon from '../searhbar-with-icon'
import SelectFilter from '../select-filter'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { DotsThreeVertical, PencilSimple, Trash } from '@phosphor-icons/react'
import { Due, useGetDuesLazyQuery } from '@/graphql/__generated__/graphql'
import moment from 'moment'

const years = [
    {
        id: 2023,
        name: "2023"
    },
    {
        id: 2024,
        name: '2024'
    }
]

const DueManagement = () => {
    const [dueList, setDueList] = useState<any>()
    let [index, setIndex] = useState<number>(0)

    const [getDues, {loading: duesLoader, error: dueError}] = useGetDuesLazyQuery({fetchPolicy: 'no-cache'})

    const loadingState = duesLoader || dueList === 0 ? "loading" : "idle";

    useEffect(() => {
        ;(async () => {
            const res = await getDues()
            setDueList(res.data?.dues)
        })()
    }, [getDues])

    const renderCell = React.useCallback((due: Due, columnKey: React.Key) => {
        const cellValue = due[columnKey as keyof Due];
        
    
        switch (columnKey) {
            case "id":
                return <span>{++index}</span>;
            case "name":
                return (
                    <div>{due?.name}</div>
                )
            case "year":
                return (
                    <div>{moment(due.startsAt).format("Y")}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={due.status === 'Active' ? 'success' : 'warning'} size="sm" variant="flat">
                        <span className={due.status === 'Active' ? 'text-[#0A7535]': 'text-[#916B09]'}>{cellValue}</span>
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-3">
                        <PencilSimple size={20} color='#161314' className='cursor-pointer' />
                        <Trash size={20} color='#C70F0F' className='cursor-pointer' />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    
    return (
        <div>
            <div className='pt-6 pb-4'>
                <Formik
                    onSubmit={() => console.log('here...')}
                    initialValues={{query: ''}}
                >
                    {({values, touched, errors, handleBlur, handleChange, handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className='flex sm:flex-row xs:flex-col sm:space-x-3 xs:space-x-0 xs:space-y-3 sm:space-y-0'>
                            <SearhbarWithIcon 
                                name='query' 
                                placeholder='Search by name'
                                className={`flex sm:w-96 xs:w-full ${errors.query && touched.query ? 'ring-red-500': ''} pr-10`}
                            />
                            <SelectFilter nullValue="Year" name='membershipType' data={years} className='flex' />
                        </Form>
                    )}
                </Formik>
            </div>
            <Table aria-label="">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="amount">Amount</TableColumn>
                    <TableColumn key="year">Year</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
                    <TableColumn key={'actions'}>.</TableColumn>
                </TableHeader>
                <TableBody
                    items={dueList ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={"No dues to display."}
                >
                    {(item: any) => (
                        <TableRow key={item?.id} className='border-b last:border-b-0'>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DueManagement