'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import { membershipType } from '@/lib/common'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Member, useDeactivateMemberMutation, useGetMembersLazyQuery } from '@/graphql/__generated__/graphql'
import {DotsThreeVertical} from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { SearchNormal } from 'iconsax-react'
import CustomSearch from '@/components/custom-select'

const MemberList = () => {
    const [members, setMembers] = useState<any>([])
    const [membersHolder, setMembersHolder] = useState<any>([])
    const [index, setIndex] = useState<number>(0)
    const [selectValue, setSelectValue] = useState<string>('')
    const [getMembers, {loading, fetchMore}] = useGetMembersLazyQuery({fetchPolicy: 'no-cache'})
    const [deactiveMember, {}] = useDeactivateMemberMutation()

    const loadingState = loading || members === 0 ? "loading" : "idle";

    useEffect(() => {
        ;(async () => {
            const res = await getMembers()
            if(res.error){
                toast.error(res.error.message)
            } else{
                setMembers(res?.data?.members)
                setMembersHolder(res?.data?.members)
            }
        })()
        document.title = `Members | NIA-Kd`
    }, [getMembers])

    const switchMemberStatus = async (memberId: string, status: string) => {
        const member = (await deactiveMember({
            variables: {
                memberId,
                status
            }
        })).data

        if(member?.deactivateMember && members.length !== 0){
            const res = await getMembers()
            if(res.error){
                toast.error(res.error.message)
            } else{
                setMembers(res?.data?.members)
            }
        }
    }

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
            case "membershipType":
                return (
                    <div>{member.membershipType?.name}</div>
                )
            case "joined": 
                return (
                    <div>{moment(member.createdAt).format('LL')}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={(member.status === 'Active' || member.status === 'ACTIVE') ? 'success' : 'default'} size="sm" variant="flat">
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
                            {member.status === 'Active' ? (
                                <DropdownItem onClick={() => switchMemberStatus(member.id, 'Inactive')}>Deactivate</DropdownItem>
                            ): (
                                <DropdownItem onClick={() => switchMemberStatus(member.id, 'Active')}>Activate</DropdownItem>
                            )}
                        </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [switchMemberStatus]);

    const searchMembers = (query: string) => {
        if(query === '') {
          setMembers(membersHolder)
        } else {
          const filteredEvents = members?.filter((member: Member) => {
            return member?.firstName?.toLowerCase().includes(query) 
                || member?.lastName?.toLowerCase().includes(query) 
                || member?.membershipType?.name?.toLowerCase().includes(query) 
                || member?.phoneNumber?.toLowerCase().includes(query)
          })
          setMembers(filteredEvents)
        }
    }

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSelectValue(value)
        if(value.length === 0 || value === 'All') {
          setMembers(membersHolder)
        } else {
          const filteredEvents = members?.filter((member: Member) => {
            return member?.firstName?.toLowerCase().includes(value) 
                || member?.lastName?.toLowerCase().includes(value) 
                || member?.membershipType?.name?.toLowerCase().includes(value) 
                || member?.phoneNumber?.toLowerCase().includes(value)
          })
          setMembers(filteredEvents)
        }
    }

    return (
        <div className='sm:px-12 xs:px-4'>
            <TitleHeader title='Members' />
            <div className='flex pt-6 pb-4 w-full gap-4'>
                <div className='relative rounded-md shadow-sm sm:w-2/5 xs:w-full'>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchNormal variant='Outline' size={20} color='gray' />
                    </div>
                    <input 
                        name='query'
                        placeholder='Search members'
                        type='search'
                        className={`pr-3 pl-10 block w-full rounded-md h-11 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
                        onChange={(e) => searchMembers(e.target.value)}
                    />
                </div>
                <div>
                    <CustomSearch 
                        data={membershipType}
                        name='query'
                        nullValue='All'
                        onChange={handleStatusChange}
                    />
                </div>
            </div>
            <div>
                <Table aria-label="">
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
                        loadingContent={<Spinner color='default' />}
                        loadingState={loadingState}
                        emptyContent={"No members to display."}
                    >
                        {(item: Member) => (
                            <TableRow key={item?.id} className='border-b last:border-b-0'>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default MemberList