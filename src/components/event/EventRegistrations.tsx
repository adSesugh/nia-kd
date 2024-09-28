'use client'

import { EventRegistration, useGetRegisteredMembersLazyQuery, useResendEventMailMutation } from '@/graphql/__generated__/graphql'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { DotsThreeVertical } from '@phosphor-icons/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EventRegistrations = ({ eventId }: {eventId: string}) => {
    let [index, setIndex] = useState<number>(0)
    const [registeredMembers, setRegisteredMembers] = useState<any>()
    const [getRegisteredMembers, {loading}] = useGetRegisteredMembersLazyQuery({fetchPolicy: 'no-cache'})
    const [resendEventMail, {loading: sendLoading}] = useResendEventMailMutation()
    const [selectedMember, setSelectedMember] = useState<EventRegistration| null>(null)

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

    const mailResend = async (registrant: EventRegistration) => {
        console.log(registrant)
        const resMail = await resendEventMail({
            variables: {
                input: {
                    email: registrant.registrantDetail.email,
                    firstName: registrant.registrantDetail.firstName,
                    lastName: registrant.registrantDetail.lastName,
                    eventId: eventId,
                    phone: registrant.registrantDetail.phoneNumber,
                    memberPhotoURL: registrant.member?.photoURL
                }
            }
        })

        if(resMail.data?.resendEventMail){
            toast.success('Email sent!')
            setSelectedMember(null)
        } else {
            toast.error('Email not sent!')
        }
    }

    console.log("selected", selectedMember)

    const renderCell = React.useCallback((registeredMember: EventRegistration, columnKey: React.Key) => {
        const cellValue = registeredMember[columnKey as keyof EventRegistration];
        
        switch (columnKey) {
            case "id":
            return <span>{++index}</span>;
            case "first_name":
              return (
                <div>{registeredMember?.registrantDetail.firstName}</div>
              )
            case "last_name":
                return (
                  <div>{registeredMember?.registrantDetail.lastName}</div>
                )
            case "email":
                return (
                  <div>{registeredMember?.registrantDetail.email}</div>
                )
            case "registered":
              return (
                <div>{moment(registeredMember?.createdAt).format('LL')}</div>
              )
            case "action":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        {sendLoading ? (
                            <Spinner color='default' size={'sm'} />
                        ): (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly size="sm" variant="light">
                                        <DotsThreeVertical size={40} className="text-default-300" color='#161314' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => {
                                        setSelectedMember(registeredMember)
                                        mailResend(registeredMember)
                                    }}>Resend registration mail</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className='h-full w-full overflow-y-auto pb-10'>
            <div className='flex items-center py-3 px-3 rounded-t-lg bg-white space-x-3'>
                <div className='text-[#554E51] text-sm'>
                    <span>{registeredMembers?.length || 0} registrations</span>
                </div>
            </div>
            <Table aria-label="attendance">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="first_name">First name</TableColumn>
                    <TableColumn key="last_name">Last name</TableColumn>
                    <TableColumn key="email">Email</TableColumn>
                    <TableColumn key="registered">Registered</TableColumn>
                    <TableColumn key="action"><span></span></TableColumn>
                </TableHeader>
                <TableBody
                    items={registeredMembers ?? []}
                    loadingContent={<Spinner color='default' />}
                    loadingState={loadingState}
                    emptyContent={(
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <span>No member to display.</span>
                    </div>
                    )}
                >
                    {(item: EventRegistration) => (
                        <TableRow key={item?.id} className='border-b last:border-b-0'>
                            {(columnKey) => <TableCell className='py-3'>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default EventRegistrations