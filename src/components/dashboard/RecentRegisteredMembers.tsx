import { Member, useGetRecentRegistrationQuery } from '@/graphql/__generated__/graphql'
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import moment from 'moment'
import React from 'react'

const RecentRegisteredMembers = () => {
    const {data: recentMembers, 
        loading, 
        error 
      } = useGetRecentRegistrationQuery({fetchPolicy: 'no-cache'})

    const loadingState = loading || recentMembers?.getRecentRegistration?.length === 0 ? "loading" : "idle";
    
    const renderCell = React.useCallback((member: Member, columnKey: React.Key) => {
        const cellValue = member[columnKey as keyof Member];
        
    
        switch (columnKey) {
            case "name":
                return (
                    <div>{member.firstName} {member.lastName}</div>
                )
            case "joined":
                return (
                    <div className='flex space-x-3 items-center'>
                        <span>{moment(member.createdAt).format("LL")}</span>
                        <div className='h-1 w-1 rounded-full bg-slate-300' />
                        <span>{moment(member.createdAt).format("h:ssA")}</span>
                    </div>
                )
            default:
                return cellValue;
        }
    }, []);

    return (
        <div>
            <Table aria-label="" className='table w-full'>
                <TableHeader>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="membershipType">Membership type</TableColumn>
                    <TableColumn key="joined">Joined</TableColumn>
                </TableHeader>
                <TableBody
                    items={recentMembers?.getRecentRegistration ?? []}
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

export default RecentRegisteredMembers