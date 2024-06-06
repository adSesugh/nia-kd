'use client'

import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import SearhbarWithIcon from '../searhbar-with-icon'
import SelectFilter from '../select-filter'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { DotsThreeVertical } from '@phosphor-icons/react'

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

const PaidAds = () => {
    const [dues, setDues] = useState<any>()
    const [index, setIndex] = useState<number>(0)

    const loadingState = '' || dues === 0 ? "loading" : "idle";
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
        <div className='pt-4'>
            <Table aria-label="">
                <TableHeader>
                <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="content">Content</TableColumn>
                    <TableColumn key="created_at">Date</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
                    <TableColumn key={'actions'}>Action</TableColumn>
                </TableHeader>
                <TableBody
                    items={dues ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={"No paid ads to display."}
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

export default PaidAds