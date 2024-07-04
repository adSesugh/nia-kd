import { EventRegistration, useGetMembersAttendanceLazyQuery } from '@/graphql/__generated__/graphql'
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

const EventAttendance = ({ eventId }: {eventId: string}) => {
    const [attendance, setAttendance] = useState<any>([])
    const [index, setIndex] = useState<number>(0)
    const [getAttendance, {loading}] = useGetMembersAttendanceLazyQuery({fetchPolicy: 'no-cache'})

    const loadingState = loading || attendance === 0 ? "loading" : "idle";

    useEffect(() => {
      ;(async() => {
          const res = (await getAttendance({
              variables: {
                  eventId
              }
          })).data

          setAttendance(res?.getMembersAttendance)
      })()
    }, [getAttendance, eventId])

  const renderCell = React.useCallback((registeredMember: EventRegistration, columnKey: React.Key, index: number) => {
      const cellValue = registeredMember[columnKey as keyof EventRegistration];
      
      switch (columnKey) {
          case "id":
              setIndex(cur => cur + 1)
              return <span>{index}</span>;
          case "full_name":
            return (
              <div>{registeredMember?.registrantDetail.firstName} {registeredMember?.registrantDetail.firstNamelastName}</div>
            )
          case "email":
              return (
                <div>{registeredMember?.registrantDetail.email}</div>
              )
          case "registered":
            return (
              <div>{moment(registeredMember?.createdAt).format('LL')}</div>
            )
          case "checkin":
              return (
                  <Chip className={`capitalize border ${registeredMember.checkin ? '#3ABC5E': '#B7B7B7'}`} size="sm" variant="bordered">
                      <span className={`${registeredMember.checkin ? 'text-[#3ABC5E]' : 'text-[#B7B7B7]'}`}>{registeredMember.checkin ? 'Checked in' : 'Check in'}</span>
                  </Chip>
              );
          default:
              return cellValue;
      }
  }, []);
    
  return (
    <div className='h-full w-full overflow-y-auto'>
      <div className='flex items-center py-3 px-3 rounded-t-lg bg-white space-x-3'>
        <div className='text-[#554E51] text-sm'>
          <span>{attendance?.length || 0} attendees</span>
        </div>
        <div className='h-1.5 w-1.5 rounded-full bg-[#CECECE]'></div>
        <div className='text-sm text-[#161314]'>
          {attendance.filter((item: EventRegistration) => item.checkin)?.length || 0} <span>checked-in</span>
        </div>
      </div>
      <Table aria-label="attendance">
        <TableHeader>
            <TableColumn key="id">S/N</TableColumn>
            <TableColumn key="full_name">Full name</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="registered">Registered</TableColumn>
            <TableColumn key="checkin"><span></span></TableColumn>
        </TableHeader>
        <TableBody
            items={attendance ?? []}
            loadingContent={<Spinner />}
            loadingState={loadingState}
            emptyContent={(
              <div className='flex flex-col items-center justify-center gap-3'>
                <span>No attendance to display.</span>
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

export default EventAttendance