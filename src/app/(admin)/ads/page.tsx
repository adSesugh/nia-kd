'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react"
import { Form, Formik } from 'formik'
import SearhbarWithIcon from '@/components/searhbar-with-icon'
import SelectFilter from '@/components/select-filter'
import FreeAds from '@/components/ads/FreeAds'
import PaidAds from '@/components/ads/PaidAds'
import TextAreaField from '@/components/textarea-field'
import TextField from '@/components/textfield'
import { modelStatus } from '@/lib/common'

const AdvertPage = () => {
    const [selectedTab, setSelectedTab] = useState('free')
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        document.title = `Ads | NIA-Kd`
    }, [])

    return (
        <div className='sm:px-12 xs:px-4'>
            <div className='flex justify-between items-center'>
                <TitleHeader title='Ads' />
            </div>
            <div className='flex justify-between pt-6 pb-4'>
               <div>
                <Formik
                        onSubmit={() => console.log('here...')}
                        initialValues={{query: ''}}
                    >
                        {({values, touched, errors, handleBlur, handleChange, handleSubmit}) => (
                            <Form onSubmit={handleSubmit} className='flex sm:flex-row xs:flex-col sm:space-x-3 xs:space-x-0 xs:space-y-3 sm:space-y-0'>
                                <SearhbarWithIcon 
                                    name='query' 
                                    placeholder='Search by name'
                                    className={`flex sm:w-96 xs:w-full ${errors.query && touched.query ? 'ring-red-500': ''} pr-10`}
                                />
                                <SelectFilter nullValue="All" name='membershipType' data={modelStatus} className='flex' />
                            </Form>
                        )}
                    </Formik>
               </div>
               <div>
                    <button 
                        onClick={onOpen}
                        className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                    >
                        Create Ad
                    </button>
               </div>
            </div>
            <div className='pb-3'>
                <div className='flex pb-2 border-b border-[#DBDBDB] w-full'>
                    <div className='-mb-2.5 space-x-6'>
                    <button className={selectedTab === 'free' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('free')}>Free ads</button>
                    <button className={selectedTab === 'paid' ? 'text-[#161314] font-medium border-b-[3px] pb-1 border-[#161314] px-1 text-sm' : 'text-sm'} onClick={() => setSelectedTab('paid')}>Paid ads</button>
                    </div>
                </div>
                {selectedTab === 'free' && <FreeAds />}
                {selectedTab === 'paid' && <PaidAds />}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 justify-center items-center text-lg">Create Ads</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={{name: '', starts_at:'', ends_at: '', amount: ''}}
                                    onSubmit={async(values) => console.log(values)}
                                >
                                    {({values, handleBlur, handleChange, handleSubmit}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <TextField label='Ad name' name='name' placeholder='A suitable name for the ad' />
                                            <TextAreaField name='content' label='Ad content' placeholder='Type the content of your ad as it will appear on the website' />
                                            <TextField label={`Link`} name='link' placeholder='A suitable url for the ad' />
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

export default AdvertPage