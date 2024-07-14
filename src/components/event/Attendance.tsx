import { EventRegistration, useGetMembersAttendanceLazyQuery, useMemberEventCheckinMutation } from '@/graphql/__generated__/graphql'
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import { SearchNormal } from 'iconsax-react'

const EventAttendance = ({ eventId }: {eventId: string}) => {
    let [index, setIndex] = useState<number>(0)
    const [attendance, setAttendance] = useState<any>([])
    const [attendanceHolder, setAttendanceHolder] = useState<any>([])
    const [getAttendance, {loading}] = useGetMembersAttendanceLazyQuery({fetchPolicy: 'no-cache'})
    const [checkinMember] = useMemberEventCheckinMutation()

    const loadingState = loading || attendance === 0 ? "loading" : "idle";

    useEffect(() => {
      ;(async() => {
          const res = (await getAttendance({
              variables: {
                  eventId
              }
          })).data

          setAttendance(res?.getMembersAttendance)
          setAttendanceHolder(res?.getMembersAttendance)
      })()
    }, [getAttendance, eventId])

  const memberCheckin = async (registrantId: string) => {
    const checkinRes = (await checkinMember({
      variables: {
        id: registrantId
      }
    })).data
    if(checkinRes?.memberEventCheckin){
      toast.success('Member checkin!')

      const res = (await getAttendance({
          variables: {
              eventId
          }
      })).data

      setAttendance(res?.getMembersAttendance)
      setAttendanceHolder(res?.getMembersAttendance)
    } else {
      toast.error('Error occured!')
    }
  }

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
          case "checkin":
              return (
                  <Chip 
                    className={`capitalize border-2 border-[#3ABC5E] cursor-pointer px-2 py-2.5 border-[${registeredMember.checkin ? '#3ABC5E': '#2e2929'}]`} 
                    size="md" 
                    variant="bordered"
                    onClick={() => memberCheckin(registeredMember.id)}
                    isDisabled={registeredMember.checkin as boolean}
                  >
                      <span className={`${registeredMember.checkin ? 'text-[#3ABC5E]' : 'text-[#2e2929]'}`}>{registeredMember.checkin ? 'Checked in' : 'Check in'}</span>
                  </Chip>
              );
          default:
              return cellValue;
      }
  }, []);

  const searchRegistrations = (query: string) => {
    if(query === '') {
      setAttendance(attendanceHolder)
    } else {
      const filteredEvents = attendance?.filter((att: EventRegistration) => {
        return att?.registrantDetail.firstName?.toLowerCase().includes(query) 
            || att?.registrantDetail.lastName?.toLowerCase().includes(query) 
            || att?.registrantDetail.phoneNumber.toLowerCase().includes(query)
      })
      setAttendance(filteredEvents)
    }
  }
    
  return (
    <div className='h-full w-full overflow-y-auto pb-10'>
      <div className='flex pb-4 w-full gap-4'>
        <div className='relative rounded-md shadow-sm sm:w-2/5 xs:w-full'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchNormal variant='Outline' size={20} color='gray' />
            </div>
            <input 
                name='query'
                placeholder='Search registrants'
                type='search'
                className={`pr-3 pl-10 block w-full rounded-md h-11 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
                onChange={(e) => searchRegistrations(e.target.value)}
            />
        </div>
      </div>
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
            <TableColumn key="first_name">First name</TableColumn>
            <TableColumn key="last_name">Last name</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="registered">Registered</TableColumn>
            <TableColumn key="checkin"><span></span></TableColumn>
        </TableHeader>
        <TableBody
            items={attendance ?? []}
            loadingContent={<Spinner color='default' />}
            loadingState={loadingState}
            emptyContent={(
              <div className='flex flex-col items-center justify-center gap-3'>
                <span>No attendance to display.</span>
              </div>
            )}
        >
            {(item: EventRegistration) => (
                <TableRow key={item?.id} className='border-b last:border-b-0'>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  )
}

export default EventAttendance