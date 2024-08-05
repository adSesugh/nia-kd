'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, Spinner, TableCell, Chip} from "@nextui-org/react"
import { Form, Formik } from 'formik'
import DateField from '@/components/date-field'
import TextField from '@/components/textfield'
import { Due, useArchiveDueMutation, useCreateDueMutation, useGetDuesLazyQuery, useGetMembershipTypesQuery, useUpdateDuesMutation } from '@/graphql/__generated__/graphql'
import { toast } from 'react-toastify'
import moment from 'moment'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import { SearchNormal } from 'iconsax-react'
import CustomSearch from '@/components/custom-select'

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


const DuesPage = () => {
    let [index, setIndex] = useState<number>(0)
    const [clickBtn, setClickBtn] = useState('save')
    const [dueList, setDueList] = useState<any>([])
    const [dueListHolder, setDueListHolder] = useState<any>()
    const [selectValue, setSelectValue] = useState<string>('')
    const [selectedDue, setSelectedDue] = useState<Due>()

    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const {isOpen: editOpen, onOpen: editOnOpen, onOpenChange: editOnOpenChange } = useDisclosure()

    const [createDue, {loading, error}] = useCreateDueMutation()
    const [archiveDue] = useArchiveDueMutation()
    const [updateDue, {loading: DueUpdateLoader}] = useUpdateDuesMutation()
    const {data: membershipType} = useGetMembershipTypesQuery({fetchPolicy: 'no-cache'})
    const [getDues, {loading: duesLoader, error: dueError}] = useGetDuesLazyQuery({fetchPolicy: 'no-cache'})

    const loadingState = duesLoader || dueList === 0 ? "loading" : "idle";

    useEffect(() => {
        document.title = `Dues | NIA-Kd`
        ;(async () => {
            const res = await getDues()
            setDueList(res.data?.dues)
            setDueListHolder(res.data?.dues)
        })()
    }, [getDues])

    const removeDue = async (due: string) => {
        try {
            const res = await archiveDue({
                variables: {
                    dueId: due
                }
            })
    
            if(res.data?.archiveDue){
                const res = await getDues()
                setDueList(res.data?.dues)
                setDueListHolder(res.data?.dues)
    
                toast.success('Due archived')
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    } 

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
                    <div>{moment(due?.startsAt).format("Y")}</div>
                )
            case "membership":
                return (
                    <div>{due?.membershipType?.name}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={due.status === 'Active' ? 'success' : 'warning'} size="sm" variant="flat">
                        <span className={due?.status === 'Active' ? 'text-[#0A7535]': 'text-[#916B09]'}>{cellValue}</span>
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-3">
                        <PencilSimple onClick={() => {
                            setSelectedDue(due)
                            editOnOpen()
                        }} size={20} color='#161314' className='cursor-pointer' />
                        <Trash onClick={() => removeDue(due?.id)} size={20} color='#C70F0F' className='cursor-pointer' />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const searchDues = (query: string) => {
        if(query.length === 0) {
            setDueList(dueListHolder)
        } else {
            const filteredEvents = dueList?.filter((due: Due) => {
                return due.name?.toLowerCase().includes(query) || due.membershipType?.name.toLowerCase().includes(query)
            })
            setDueList(filteredEvents)
        }
    }

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSelectValue(value)
        if(value.length === 0 || value === 'All') {
            setDueList(dueListHolder)
        } else {
            const filteredEvents = dueListHolder?.filter((due: Due) => {
                return new Date(due.endsAt).getFullYear().toString().includes(value)
            })
            setDueList(filteredEvents)
        }
    }

    return (
        <div className='sm:px-12 xs:px-4 h-full pb-10 overflow-y-auto'>
            <div className='flex justify-between items-center'>
                <TitleHeader title='Dues' />
                <div className='sm:pt-10 xs:pt-2'>
                    <button 
                        onClick={onOpen}
                        className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                    >
                            Set due
                    </button>
                </div>
            </div>
            <div className='pt-4'>
                <div className='flex sm:flex-row xs:flex-col sm:space-x-3 items-center h-full w-full mt-1'>
                    <div className='relative rounded-md shadow-sm sm:w-1/3 xs:w-full'>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                            <SearchNormal variant='Outline' size={20} color='gray' />
                        </div>
                        <input 
                        name='query'
                        placeholder='Search events'
                        type='search'
                        className={`pr-3 pl-10 rounded-none h-12 block w-full border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
                        onChange={(e) => searchDues(e.target.value)}
                        />
                    </div>
                    <div>
                        <CustomSearch 
                        data={years}
                        name='query'
                        nullValue='All'
                        onChange={handleStatusChange}
                        />
                    </div>
                </div>
                <Table aria-label="" className='mt-4'>
                    <TableHeader>
                        <TableColumn key="id">S/N</TableColumn>
                        <TableColumn key="name">Name</TableColumn>
                        <TableColumn key="membership">Membership Type</TableColumn>
                        <TableColumn key="amount">Amount</TableColumn>
                        <TableColumn key="year">Year</TableColumn>
                        <TableColumn key="status">Status</TableColumn>
                        <TableColumn key={'actions'}>.</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={dueList ?? []}
                        loadingContent={<Spinner color='default' />}
                        loadingState={loadingState}
                        emptyContent={"No dues to display."}
                    >
                        {(item: any) => (
                            <TableRow key={item?.id} className='border-b last:border-b-0'>
                                {(columnKey) => <TableCell className='py-3'>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent className='overflow-y-auto'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 justify-center items-center text-lg">Create due</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={{
                                        name: '', 
                                        starts_at:'', 
                                        ends_at: '',
                                        
                                    }}
                                    onSubmit={async(values: any) => {
                                        const membersType: Record<string, any>[] = []
                                        membershipType?.getMembershipTypes?.forEach((membership) => {
                                            const mType: Record<string, any> = {}
                                            mType['amount'] = values[`${membership.name.replaceAll(' ', '_').toLowerCase()}`]
                                            mType['id'] = membership.id
                                            membersType.push(mType)
                                        })

                                        try {
                                            const res = await createDue({
                                                variables: {
                                                    input: {
                                                        name: values.name,
                                                        membership: membersType,
                                                        startsAt: values.starts_at,
                                                        endsAt: values.ends_at,
                                                        status: clickBtn === 'Save' ? 'Active' : 'Inactive'
                                                    }
                                                }
                                            })

                                            if(res.data?.createDue?.success){
                                                const resDues = await getDues()
                                                setDueList(resDues.data?.dues)
                                                setDueListHolder(resDues.data?.dues)
                                                onClose()
                                                return toast.success(res.data.createDue.message)
                                            }
                                        } catch (error: any) {
                                            console.log(error.message)
                                            if(error?.extensions?.code === 'INTERNAL_SERVER_ERROR'){
                                                toast.error("Whoops! an error occured")
                                            }
                                            toast.error(error.message)
                                        }
                                    }}
                                >
                                    {({values, handleBlur, handleChange, handleSubmit}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <TextField label='Due name' name='name' placeholder='Due name' />
                                            <div className='flex flex-row items-center justify-between gap-4 w-full'>
                                                <DateField name='starts_at' label='Start at' className='sm:w-48 xs:w-full' minDate={`${moment().startOf('year').toISOString().split('T')[0]}`} />
                                                <DateField name='ends_at' label='End at' className='sm:w-48 xs:w-full' minDate={values.starts_at} />
                                            </div>
                                            <div className='grid sm:grid-cols-2 xs:grid-cols-1 gap-3'>
                                                {membershipType?.getMembershipTypes?.map((membership) => (
                                                    <TextField key={membership.id} label={`Amount (${membership.name})`} name={membership.name.replaceAll(' ', '_').toLowerCase()} type='number' placeholder={`Amount (${'\u20a6'})`} />
                                                ))}
                                            </div>
                                            <ModalFooter className='float-right w-full pr-0'>
                                                <button type='submit' onClick={() => setClickBtn('Draft')} disabled={loading} className='border rounded-lg px-4 py-2 text-sm'>{loading ? 'Please wait...' : 'Save as draft'}</button>
                                                <button type='submit' onClick={() => setClickBtn('Save')} disabled={loading} className='bg-[#241F21] text-white rounded-lg px-6 py-2 text-sm'>{loading ? 'Please wait...': 'Save'}</button>
                                            </ModalFooter>
                                        </Form>
                                    )}
                                </Formik>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={editOpen} onOpenChange={editOnOpenChange} isDismissable={false}>
                <ModalContent className='overflow-y-auto'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 justify-center items-center text-lg">Update due</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={{
                                        name: selectedDue?.name, 
                                        starts_at: moment(selectedDue?.startsAt).format('Y-MM-D'), 
                                        ends_at: moment(selectedDue?.endsAt).format('Y-MM-D'),
                                        amount: selectedDue?.amount
                                    }}
                                    onSubmit={async(values: any) => {
                                        try {
                                            const res = await updateDue({
                                                variables: {
                                                    dueId: selectedDue?.id,
                                                    input: {
                                                        name: values.name,
                                                        startsAt: values.starts_at,
                                                        endsAt: values.ends_at,
                                                        amount: values.amount
                                                    }
                                                }
                                            })

                                            if(res.data?.updateDues?.success){
                                                const resDues = await getDues()
                                                setDueList(resDues.data?.dues)
                                                setDueListHolder(resDues.data?.dues)
                                                onClose()
                                                return toast.success(res.data.updateDues.message)
                                            }
                                        } catch (error: any) {
                                            console.log(error.message)
                                            if(error?.extensions?.code === 'INTERNAL_SERVER_ERROR'){
                                                toast.error("Whoops! an error occured")
                                            }
                                            toast.error(error.message)
                                        }
                                    }}
                                >
                                    {({values, handleBlur, handleChange, handleSubmit}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <TextField label='Due name' name='name' placeholder='Due name' />
                                            <div className='flex flex-row items-center justify-between gap-4 w-full'>
                                                <DateField name='starts_at' label='Start at' className='sm:w-48 xs:w-full' minDate={values.starts_at} />
                                                <DateField name='ends_at' label='End at' className='sm:w-48 xs:w-full' minDate={values.starts_at} />
                                            </div>
                                            <TextField label={`Amount (${'\u20a6'})`} name='amount' type='number' placeholder={`Amount (${'\u20a6'})`} />
                                            <ModalFooter className='float-right w-full pr-0'>
                                                <button type='submit' onClick={onClose} disabled={DueUpdateLoader} className='border rounded-lg px-4 py-2 text-sm'>Cancel</button>
                                                <button type='submit' onClick={() => setClickBtn('Save')} disabled={DueUpdateLoader} className='bg-[#241F21] text-white rounded-lg px-6 py-2 text-sm'>{DueUpdateLoader ? 'Please wait...': 'Save'}</button>
                                            </ModalFooter>
                                        </Form>
                                    )}
                                </Formik>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DuesPage