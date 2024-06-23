'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import DueManagement from '@/components/dues/DueManagement'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, user} from "@nextui-org/react"
import { Form, Formik } from 'formik'
import DateField from '@/components/date-field'
import TextField from '@/components/textfield'
import { useCreateDueMutation, useGetMembershipTypesQuery } from '@/graphql/__generated__/graphql'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/features/hooks'
import { RootState } from '@/features/store'
import moment from 'moment'


const DuesPage = () => {
    const userId = useAppSelector((state: RootState) => state.auth.userData.user?.id)
    const [clickBtn, setClickBtn] = useState('save')

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const [createDue, {loading, error}] = useCreateDueMutation()
    const {data: membershipType} = useGetMembershipTypesQuery({fetchPolicy: 'no-cache'})

    useEffect(() => {
        document.title = `Dues | NIA-Kd`
    }, [])

    return (
        <div className='sm:px-12 xs:px-4 h-full overflow-y-auto'>
            <div className='flex justify-between items-center'>
                <TitleHeader title='Dues' />
                <div className='sm:pt-14 xs:pt-2'>
                    <button 
                        onClick={onOpen}
                        className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                    >
                            Set due
                    </button>
                </div>
            </div>
            <div className='pb-3'>
                <DueManagement />
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
                                                        status: clickBtn === 'Save' ? 'Active' : 'Inactive',
                                                        userId: userId
                                                    }
                                                }
                                            })

                                            if(res.data?.createDue?.success){
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
                                            {userId}
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
        </div>
    )
}

export default DuesPage