'use client'

import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DotsThreeVertical } from '@phosphor-icons/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import SearhbarWithIcon from '../searhbar-with-icon';
import SelectFilter from '../select-filter';

const DraftedBlog = () => {
    const [draftblogs, setDraftBlogs] = useState<any>()
    const [index, setIndex] = useState<number>(0)

    const loadingState = '' || draftblogs === 0 ? "loading" : "idle";
    const renderCell = React.useCallback((due: any, columnKey: React.Key, index: number) => {
        const cellValue = due[columnKey as keyof any];
        
    
        switch (columnKey) {
            case "id":
                setIndex(cur => cur + 1)
                return <span>{index}</span>;
            case "name":
                return (
                    <div>{due.firstName} {due.lastName}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={due.status === 'ACTIVE' ? 'success' : 'default'} size="sm" variant="flat">
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
        <div>
            <div className='pt-6 pb-4'>
                <Formik
                    onSubmit={() => console.log('here...')}
                    initialValues={{query: ''}}
                >
                    {({values, touched, errors, handleBlur, handleChange, handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className='flex sm:flex-row xs:flex-col sm:space-x-3 xs:space-x-0 xs:gap-3'>
                            <SearhbarWithIcon 
                                name='query'
                                placeholder='Search by name'
                                className={`flex sm:w-96 xs:w-full ${errors.query && touched.query ? 'ring-red-500': ''} pr-10`}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <Table aria-label="">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="summary">Content summary</TableColumn>
                    <TableColumn key="created_at">Date created</TableColumn>
                    <TableColumn key="year">Year</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
                    <TableColumn key={'actions'}>Action</TableColumn>
                </TableHeader>
                <TableBody
                    items={draftblogs ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={"No drafted blog to display."}
                >
                    {(item: any) => (
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DraftedBlog