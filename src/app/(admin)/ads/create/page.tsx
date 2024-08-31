'use client'

import { useCreateCompaignMutation } from '@/graphql/__generated__/graphql'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TitleHeader from '../../TitleHeader'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import TextField from '@/components/textfield'
import Link from 'next/link'
import NIAFileInput from '@/components/nia-fileinput'
import moment from 'moment'
import DateField from '@/components/date-field'
import TimeField from '@/components/timefield'
import { combineDateTime } from '@/lib/common'

const Page = () => {
    const router = useRouter()
    const [base64, setBase64] = useState<string>()
    const [mobileBase64, setMobileBase64] = useState<string>()
    const [createAds, { loading }] = useCreateCompaignMutation()

    useEffect(()=>{
        document.title = 'New Compaign | NIA-Kd'
    }, [])

    return (
        <div className='sm:px-60 xs:px-6 pb-16 h-full overflow-y-auto w-full'>
            <TitleHeader title='New Compaign' />
            <Formik
                initialValues={{
                    name: '',
                    duration: 0,
                    start_date: '',
                    start_time: '',
                    webbanner: '',
                    mobilebanner: '',
                    link: ''
                }}
                onSubmit={async(values) => {
                    try {
                        const res = await createAds({
                            variables: {
                                input: {
                                    name: values.name,
                                    duration: values.duration,
                                    start_time: combineDateTime(moment(new Date()).format('Y-MM-DD'), values.start_time),
                                    starts_at: moment(values.start_date),
                                    ends_at: moment(values.start_date).add(values.duration, 'days'),
                                    web_banner: values.webbanner,
                                    mobile_banner: values.mobilebanner,
                                    link: values.link
                                },
                            }
                        })

                        if(res.data?.createCompaign?.id){
                            toast.success("Ads created")
                            return router.back()
                        }
                    } catch (error: any) {
                        console.log(error.message)
                        toast.error(error)
                    }
                }}
            >
                {({values, handleSubmit, isSubmitting, setFieldValue}) => (
                    <Form onSubmit={handleSubmit} className='mb-10'>
                        <div className='w-full bg-white py-6 border-t px-4 mt-4'>
                            <TextField 
                                name='name' 
                                label='Compaign name'
                                placeholder='A suitable name for the ad' 
                            />
                            <TextField 
                                name='duration' 
                                label='How long do you want the compaign to run? (days)'
                                placeholder='Duration' 
                                type='number'
                            />
                            <div className='flex sm:flex-row xs:flex-col justify-between gap-4'>
                                <div className='sm:w-1/2 xs:w-full'>
                                    <DateField 
                                        name='start_date'
                                        label='Start Date'
                                        className='w-full'
                                        minDate={values.start_date}
                                    />
                                </div>
                                <div className='sm:w-1/2 xs:w-full'>
                                    <TimeField
                                        name='start_time'
                                        label='Start Time'
                                        className='w-full' 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='px-6 py-4 bg-white my-6 w-full'>
                            <NIAFileInput 
                                name='webbanner' 
                                id={'webbanner'}
                                label='Upload image (for web display)' subtitle='Recommended image size is 5 : 1'
                                handleFileChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                const file = e.currentTarget.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFieldValue('webbanner', reader.result as string);
                                        setBase64(reader.result as string)
                                    };
                                    reader.readAsDataURL(file);
                                }
                            } } base64={base64} className='w-full' />
                        </div>
                        <div className='flex px-6 py-4 bg-white my-6 w-full'>
                            <NIAFileInput 
                                name='mobilebanner' 
                                id={'mobilebanner'}
                                label='Upload image (for mobile display)' subtitle='Recommended image size is 1 : 1'
                                handleFileChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                const file = e.currentTarget.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFieldValue('mobilebanner', reader.result as string);
                                        setMobileBase64(reader.result as string)
                                    };
                                    reader.readAsDataURL(file);
                                }
                            } } base64={mobileBase64} className='sm:!w-64 xs:!w-full' />
                        </div>
                        <div className='w-full bg-white py-6 border-t px-4 mt-4'>
                            <TextField 
                                name='link' 
                                label='Ads link'
                                placeholder='Paste link' 
                            />
                            <div className='flex pt-10 pb-4 gap-2 float-end mb-8'>
                                <Link href={'/blogs/list'} className='border rounded-lg px-4 py-2 text-sm'>Cancel</Link>
                                <button type='submit' disabled={loading} className='bg-[#241F21] text-white rounded-lg px-6 py-2 text-sm'>{loading ? 'Please wait...': 'Publish'}</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Page