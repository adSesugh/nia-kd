'use client'

import { EventRegistration, useGetRegisteredMembersLazyQuery } from '@/graphql/__generated__/graphql'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { DotsThreeVertical } from '@phosphor-icons/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const EventRegistrations = ({ eventId }: {eventId: string}) => {
    const [index, setIndex] = useState<number>(0)
    const [registeredMembers, setRegisteredMembers] = useState<any>()
    const [getRegisteredMembers, {loading}] = useGetRegisteredMembersLazyQuery({fetchPolicy: 'no-cache'})

    const loadingState = loading || registeredMembers === 0 ? "loading" : "idle";

    useEffect(() => {
        ;(async() => {
            const res = (await getRegisteredMembers({
                variables: {
                    eventId
                }
            })).data

            setRegisteredMembers(res?.getRegisteredMembers)
        })()
    }, [getRegisteredMembers, eventId])

    const resendMail = async (registrationId: string) => console.log(registrationId)

    const renderCell = React.useCallback((registeredMember: EventRegistration, columnKey: React.Key, index: number) => {
        const cellValue = registeredMember[columnKey as keyof EventRegistration];
        
        switch (columnKey) {
            case "id":
                setIndex(cur => cur + 1)
                return <span>{index}</span>;
            case "first_ame":
              return (
                <div>{registeredMember?.registrantDetail.firstName}</div>
              )
            case "last_ame":
                return (
                  <div>{registeredMember?.registrantDetail.firstNamelastName}</div>
                )
            case "email":
                return (
                  <div>{registeredMember?.registrantDetail.email}</div>
                )
            case "registered":
              return (
                <div>{moment(registeredMember?.createdAt).format('LL')}</div>
              )
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <DotsThreeVertical size={40} className="text-default-300" color='#161314' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu onClick={() => resendMail(registeredMember.id)}>
                                <DropdownItem>Resend registration mail</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className='h-full w-full overflow-y-auto'>
            <div className='flex items-center py-3 px-3 rounded-t-lg bg-white space-x-3'>
                <div className='text-[#554E51] text-sm'>
                    <span>{registeredMembers?.length || 0} registrations</span>
                </div>
            </div>
            <Table aria-label="attendance">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="full_name">Full name</TableColumn>
                    <TableColumn key="email">Email</TableColumn>
                    <TableColumn key="registered">Registered</TableColumn>
                    <TableColumn key="action"><span></span></TableColumn>
                </TableHeader>
                <TableBody
                    items={registeredMembers ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={(
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <span>No member to display.</span>
                    </div>
                    )}
                >
                    {(item: EventRegistration) => (
                        <TableRow key={item?.id} className='border-b last:border-b-0'>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default EventRegistrations