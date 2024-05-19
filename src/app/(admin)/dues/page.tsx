'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import DueManagement from '@/components/dues/DueManagement'
import DuePayments from '@/components/dues/DuePayments'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react"
import { Form, Formik } from 'formik'
import DateField from '@/components/date-field'
import TextField from '@/components/textfield'


const DuesPage = () => {
    const [selectedTab, setSelectedTab] = useState('manage')
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        document.title = `Dues | NIA-Kd`
    }, [])

    return (
        <div className='sm:px-12 xs:px-4'>
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
            <div className='pt-5 pb-3'>
                <div className='flex pb-2 border-b border-[#DBDBDB] w-full'>
                    <div className='-mb-2.5 space-x-6'>
                    <button className={selectedTab === 'manage' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('manage')}>Manage</button>
                    <button className={selectedTab === 'payments' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('payments')}>Due Payments</button>
                    </div>
                </div>
                {selectedTab === 'manage' && <DueManagement />}
                {selectedTab === 'payments' && <DuePayments />}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 justify-center items-center text-lg">Create due</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={{name: '', starts_at:'', ends_at: '', amount: ''}}
                                    onSubmit={async(values) => console.log(values)}
                                >
                                    {({values, handleBlur, handleChange, handleSubmit}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <TextField label='Due name' name='name' placeholder='Due name' />
                                            <div className='flex sm:flex-row xs:flex-col items-center justify-between gap-4 w-full'>
                                                <DateField name='starts_at' label='Start at' className='sm:w-48 xs:w-full' />
                                                <DateField name='ends_at' label='End at' className='sm:w-48 xs:w-full' minDate={values.starts_at} />
                                            </div>
                                            <TextField label={`Amount (${'\u20a6'})`} name='amount' type='number' placeholder='Amount' />
                                            <ModalFooter className='float-right w-full pr-0'>
                                                <button className='border rounded-lg px-4 py-2 text-sm'>Save as draft</button>
                                                <button className='bg-[#241F21] text-white rounded-lg px-6 py-2 text-sm'>Save</button>
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