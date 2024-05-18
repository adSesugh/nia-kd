'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import SearhbarWithIcon from '@/components/searhbar-with-icon'
import { Form, Formik } from 'formik'
import SelectFilter from '@/components/select-filter'
import { membershipType } from '@/lib/common'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Member, useGetMembersLazyQuery } from '@/graphql/__generated__/graphql'
import {DotsThreeVertical} from '@phosphor-icons/react'

const MemberList = () => {
    const [members, setMembers] = useState<any>()
    const [getMembers, {loading, fetchMore}] = useGetMembersLazyQuery({fetchPolicy: 'no-cache'})

    const loadingState = loading || members === 0 ? "loading" : "idle";

    const renderCell = React.useCallback((member: Member, columnKey: React.Key) => {
        const cellValue = member[columnKey as keyof Member];
    
        switch (columnKey) {
            case "id":
                return <span>{1}</span>;
            case "name":
                return (
                    <div>{member.firstName} {member.lastName}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={member.status === 'ACTIVE' ? 'success' : 'default'} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                            <DotsThreeVertical size={32} className="text-default-300" />
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

    useEffect(() => {
        ;(async () => {
            const res = (await getMembers()).data
            setMembers(res?.members)
        })()
    }, [getMembers])

    return (
        <div className='sm:px-12 xs:px-4'>
            <TitleHeader title='Members' />
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
                            <SelectFilter name='membershipType' data={membershipType} className='flex' />
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="regId">Reg ID</TableColumn>
                    <TableColumn key="membershipType">Membership type</TableColumn>
                    <TableColumn key="email">Email</TableColumn>
                    <TableColumn key="joined">Joined</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
                    <TableColumn key={'actions'}>.</TableColumn>
                </TableHeader>
                <TableBody
                    items={members ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={"No rows to display."}
                >
                    {(item: Member) => (
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
        </div>
    )
}

export default MemberList