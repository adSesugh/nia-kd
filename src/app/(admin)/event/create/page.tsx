/* eslint-disable @next/next/no-img-element */
'use client'

import CheckBox from '@/components/checkbox'
import DateField from '@/components/date-field'
import GooglePlacesInput from '@/components/google-places-input'
import NIAFileInput from '@/components/nia-fileinput'
import TextAreaField from '@/components/textarea-field'
import TextField from '@/components/textfield'
import TimeField from '@/components/timefield'
import TinyMCEField from '@/components/tinymce-field'
import { Switch, Table, TableBody, TableColumn, TableHeader } from '@nextui-org/react'
import { Globe, MapPinSimpleArea, Plus, X } from '@phosphor-icons/react'
import { Field, Form, Formik } from 'formik'
import { Gift, MoneyTick, Video } from 'iconsax-react'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface FileWithPreview extends File {
    preview?: string;
}

const CreateEvent = () => {
    const [base64, setBase64] = useState<string>()
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [certfiles, setCertFiles] = useState<FileWithPreview[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(1)
    const [speakers, setSpeakers] = useState<Record<string, any>>([])

    const steps = ['details', 'speakers', 'form', 'resources', 'email']

    useEffect(() => {
        document.title = `Create Event | NIA-Kd`
    }, [])

    const handleFileRemove = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
    };

    return (
        <div className='pb-5 bg-[#F5F5F5] h-full overflow-y-auto'>
            <div className='flex sm:flex-row xs:flex-col sm:h-[65px] xs:py-3 sm:justify-between xs:space-y-2 sm:space-x-0 sm:px-16 xs:px-3 sm:items-center xs:justify-center xs:items-start bg-white shadow-sm pt-1.5 xs:overflow-x-hidden'>
                <h1 className='font-semibold'>Create Event</h1>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${steps[currentIndex] === 'details' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>1</div>
                        <span className='text-sm text-[#616161]'>Details</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${steps[currentIndex] === 'speakers' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>2</div>
                        <span className='text-sm text-[#616161]'>Speakers</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${steps[currentIndex] === 'form' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>3</div>
                        <span className='text-sm text-[#616161]'>Form</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${steps[currentIndex] === 'resources' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>4</div>
                        <span className='text-sm text-[#616161]'>Resources</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${steps[currentIndex] === 'email' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>5</div>
                        <span className='text-sm text-[#616161]'>Email</span>
                    </div>
                </div>
            </div>
            <div className='pt-6 pb-6 mb-12 sm:px-52 xs:px-4'>
                <Formik
                    initialValues={{
                        name: '', 
                        meetingType: 'physical', 
                        address: '', 
                        link: '', 
                        paymentType: 'Free',
                        isInfinity: false,
                        hasCertificate: false,
                        starts_at: moment(new Date()).format('Y-MM-D'),
                        ends_at: moment(new Date()).format('Y-MM-D')
                    }}
                    onSubmit={async(values) => console.log(values)}
                >
                    {({setFieldValue, values, handleSubmit}) => (
                        <Form onSubmit={handleSubmit}>
                            {steps[currentIndex] === 'details' && (
                                <>
                                    <div className='bg-white px-4 pb-3'>
                                        <NIAFileInput name='coverPhoto' label='Cover photo' subtitle='Add a cover photo to make your event pop out.' handleFileChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                            const file = e.currentTarget.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFieldValue('coverPhoto', reader.result as string);
                                                    setBase64(reader.result as string)
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }} base64={base64} />
                                    </div>
                                    <div className='mt-4 bg-white py-3'>
                                        <div className='px-4 pb-3'>
                                            <h1 className='text-[15px] font-semibold'>Event Details</h1>
                                            <span className='text-[13px] text-[#5D5D5D]'>Add a name and a description to help users know what the event is about </span>
                                        </div>
                                        <hr />
                                       <div className='pt-5 px-4'>
                                        <TextField 
                                                name='name' 
                                                label='Event name'
                                                placeholder='Give your blog post a suitable title' 
                                            />
                                            <Field name="description" label="About event" as={TinyMCEField} />
                                       </div>
                                    </div>
                                    <div className='mt-4 bg-white py-4'>
                                        <div className='pb-3 px-4'>
                                            <h1 className='text-sm font-medium'>Location</h1>
                                            <span className='text-[13px] text-[#5D5D5D]'>Let users know if the event is virtual or physical</span>
                                        </div>
                                        <hr />
                                        <div className='flex flex-col px-4 pt-5'>
                                            <h1>Where is the event taking place?</h1>
                                            <div className='flex shadow-sm bg-[#ECECEE] p-[2px] sm:w-60 xs:w-full mb-3'>
                                                <button onClick={() => {
                                                    setFieldValue('meetingType', 'physical')
                                                    setFieldValue('link', '')
                                                }} className={`flex w-1/2 p-2 space-x-2 items-center justify-center ${values.meetingType === 'physical' && 'bg-white shadow-lg'}`}>
                                                    <Globe size={20} color={`${values.meetingType === 'physical' ? '#161314': '#636363'}`} />
                                                    <span className={`text-sm ${values.meetingType === 'physical' ? 'text-[#161314]' : 'text-[#636363]'}`}>In person</span>
                                                </button>
                                                <button onClick={() => {
                                                    setFieldValue('meetingType', 'online')
                                                    setFieldValue('address', '')
                                                }} className={`flex w-1/2 p-2 h-full space-x-2 items-center justify-center ${values.meetingType === 'online' && 'bg-white shadow-lg'}`}>
                                                    <Video size={20} color={`${values.meetingType === 'online' ? '#161314': '#636363'}`} />
                                                    <span className={`text-sm ${values.meetingType === 'online' ? 'text-[#161314]' : 'text-[#636363]'}`}>Online</span>
                                                </button>
                                            </div>
                                            {values.meetingType === 'physical' ? (
                                                <GooglePlacesInput 
                                                    name='address' 
                                                    label='Event address'
                                                    type='search'
                                                    placeholder='Event Address' 
                                                    onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                                                        setFieldValue('address', place.formatted_address)
                                                    }}
                                                    LeftIcon={<MapPinSimpleArea size={20} />}
                                                />
                                            ):(
                                                <TextField 
                                                    name='link' 
                                                    label='Meeting link'
                                                    type='url'
                                                    placeholder='Event meeting link' 
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-4 bg-white p-4'>
                                        <div className='pb-3 px-4'>
                                            <h1 className='text-sm font-medium'>Date and Time</h1>
                                            <span className='text-[13px] text-[#5D5D5D]'>Let users know when and what time the event is going to start.</span>
                                        </div>
                                        <hr />
                                        <div className='flex px-4 pt-5 gap-4'>
                                            <div className=' w-1/2'>
                                                <div className='flex flex-col sm:w-2/3 xs:w-full'>
                                                    <DateField 
                                                        name='starts_at'
                                                        label='Starts at'
                                                        className='w-full'
                                                        minDate={values.starts_at}
                                                    />
                                                    <TimeField
                                                        name='starts_at_time'
                                                        label='Starts Time'
                                                        className='w-full' 
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-1/2'>
                                                <div className='flex flex-col sm:w-2/3 xs:w-full'>
                                                    <DateField 
                                                        name='ends_at'
                                                        label='Ends at'
                                                        className='w-full'
                                                        minDate={values.starts_at}
                                                    />
                                                    <TimeField
                                                        name='ends_at_time'
                                                        label='Ends Time'
                                                        className='w-full' 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-4 bg-white py-4'>
                                        <div className='pb-3 px-4'>
                                            <h1 className='text-sm font-medium'>Ticket and Price</h1>
                                            <span className='text-[13px] text-[#5D5D5D]'>Let users know if the event is free or paid and requires a ticket.</span>
                                        </div>
                                        <hr />
                                        <div className='px-4 pt-5'>
                                            <div className='flex flex-col'>
                                                <h1>How do you plan on hosting this event?</h1>
                                                <div className='flex shadow-sm bg-[#ECECEE] p-[2px] sm:w-60 xs:w-full mb-3'>
                                                    <button onClick={() => {
                                                        setFieldValue('paymentType', 'Free')
                                                        setFieldValue('isInfinity', false)
                                                    }} className={`flex w-1/2 p-2 space-x-2 items-center justify-center ${values.paymentType === 'Free' && 'bg-white shadow-lg'}`}>
                                                        <Gift size={20} color={`${values.paymentType === 'Free' ? '#161314': '#636363'}`} />
                                                        <span className={`text-sm ${values.paymentType === 'Free' ? 'text-[#161314]' : 'text-[#636363]'}`}>Free</span>
                                                    </button>
                                                    <button onClick={() => {
                                                        setFieldValue('paymentType', 'Paid')
                                                        setFieldValue('isInfinity', false)
                                                    }} className={`flex w-1/2 p-2 h-full space-x-2 items-center justify-center ${values.paymentType === 'Paid' && 'bg-white shadow-lg'}`}>
                                                        <MoneyTick size={20} color={`${values.paymentType === 'Paid' ? '#161314': '#636363'}`} />
                                                        <span className={`text-sm ${values.paymentType === 'Paid' ? 'text-[#161314]' : 'text-[#636363]'}`}>Paid</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='flex sm:flex-row xs:flex-col gap-4'>
                                                <TextField 
                                                    name='amount' 
                                                    label={`Amount ${'\u20a6'}`}
                                                    type='numeric'
                                                    placeholder='Event amount'
                                                    disabled={values.paymentType === 'Free' ? true : false} 
                                                />
                                                <TextField 
                                                    name='tickets' 
                                                    label='Set number of tickets'
                                                    placeholder='Ticket capacity' 
                                                    disabled={values.isInfinity}
                                                />
                                            </div>
                                            <div>
                                                <CheckBox name='isInfinity' label='Ticket is infinity' />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {steps[currentIndex] === 'speakers' && (
                                <div>
                                    <div className='pb-3'>
                                        <h1 className='text-lg font-semibold'>Add speakers</h1>
                                    </div>
                                    <div className='bg-white'>
                                        <div className='flex sm:flex-row xs:flex-col p-4 gap-5'>
                                            <div className='sm:w-1/3 xs:w-full'>
                                                <div className="flex justify-center items-center border-2 border-dashed p-6 text-center mb-4 cursor-pointer rounded-lg h-72">
                                                    <input
                                                        type="file"
                                                        id="speakerPix"
                                                        name='speakerPix[]'
                                                        className="hidden"
                                                        multiple
                                                        accept="image/{.gif,.png,.jpg,.jpeg}"
                                                        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                                if (event.target.files) {
                                                                const newFiles = Array.from(event.target.files).filter((file) =>
                                                                    file.type === 'image/{.gif,.png,.jpg,.jpeg}'
                                                                ).map((file) =>
                                                                    Object.assign(file, {
                                                                    preview: URL.createObjectURL(file),
                                                                    })
                                                                );
                                                                const blobUrl = newFiles[0].preview
                                                                const blob = await fetch(blobUrl).then(r => r.blob());
                                                                console.log(blob)
                                                                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="speakerPix" className="flex flex-col items-center py-1 px-2 rounded-lg bg-[#F3ECE2] cursor-pointer">
                                                        <p>Upload image</p>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='sm:w-2/3 xs:w-full'>
                                                <div>
                                                    <TextField
                                                        name='name[]'
                                                        label='Speaker name' 
                                                    />
                                                    <TextField
                                                        name='title[]'
                                                        label='Speaker title' 
                                                    />
                                                    <TextAreaField 
                                                        name='about[]'
                                                        label='About speaker (not more than 150 words)'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='h-[1px] bg-[#D9D9D9 w-full' />
                                        <div className='py-3 px-4'>
                                            <button className='flex gap-3'>
                                                <Plus size={20} color='#E08D14' />
                                                <span className='text-[#E08D14]'>Add speaker</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='w-full bg-white mt-4'>
                                        <Table>
                                            <TableHeader>
                                                <TableColumn>Name</TableColumn>
                                                <TableColumn>Title</TableColumn>
                                                <TableColumn>About speaker</TableColumn>
                                            </TableHeader>
                                            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                            {steps[currentIndex] === 'form' && (
                                <div>
                                    <div className='pb-3'>
                                        <h1 className='text-lg font-semibold'>Create Form</h1>
                                    </div>
                                    <div className='p-4 bg-white'>
                                        <div className='pb-4'>
                                            <h1 className='text-lg'>Registration Form</h1>
                                            <span className='text-sm'>Create a form to allow users register for your event by providing their details.</span>
                                        </div>
                                        <div>
                                            <TextField 
                                                name='formTitle' 
                                                label={'Form title'}
                                            />
                                            <TextAreaField 
                                                name='instructions' 
                                                label={'Instructions'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {steps[currentIndex] === 'resources' && (
                                <div>
                                    <div className='pb-3'>
                                        <h1 className='text-lg font-semibold'>Resources</h1>
                                    </div>
                                    <div className="p-4 bg-white mt-4">
                                        <div>
                                            <h1 className='pb-3 font-medium'>Upload</h1>
                                        </div>
                                        <div className="border-2 border-dashed p-6 text-center mb-4 cursor-pointer rounded-lg">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="hidden"
                                                multiple
                                                accept="application/pdf"
                                                onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                    if (event.target.files) {
                                                    const newFiles = Array.from(event.target.files).filter((file) =>
                                                        file.type === 'application/pdf'
                                                    ).map((file) =>
                                                        Object.assign(file, {
                                                        preview: URL.createObjectURL(file),
                                                        })
                                                    );
                                                    const blobUrl = newFiles[0].preview
                                                    const blob = await fetch(blobUrl).then(r => r.blob());
                                                    console.log(blob)
                                                    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                                                    }
                                                }}
                                            />
                                            <label htmlFor="file-upload" className="flex flex-col items-center">
                                                <p>Drag and drop files here or <u>browse</u></p>
                                            </label>
                                        </div>
                                        <div className="mt-4">
                                            {files.map((file: File, index: number) => (
                                                // eslint-disable-next-line react/jsx-no-comment-textnodes
                                                <div className="flex items-center mb-2" key={index}>
                                                    <img src="/assets/PDF.png" alt="PDF Icon" className="w-6 h-6 mr-2" />
                                                    <div className="flex-grow">
                                                        <p className="font-medium text-sm">{file.name}</p>
                                                        <p className="text-gray-600 text-[12px]">{(file.size / 1024).toFixed(2)} KB</p>
                                                    </div>
                                                    <button
                                                        className="text-red-500 ml-4"
                                                        onClick={() => handleFileRemove(index)}
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='pt-6'>
                                            <div>
                                                <h1 className='pb-3 font-medium'>Certificate</h1>
                                            </div>
                                            <div className="border-2 border-dashed p-6 text-center mb-4 cursor-pointer rounded-lg">
                                                <input
                                                    type="file"
                                                    id="certificate-upload"
                                                    className="hidden"
                                                    multiple
                                                    accept="image/png"
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        if (event.target.files) {
                                                        const newFiles = Array.from(event.target.files).filter((file) =>
                                                            file.type === 'image/png'
                                                        ).map((file) =>
                                                            Object.assign(file, {
                                                            preview: URL.createObjectURL(file),
                                                            })
                                                        );
                                                        const blobUrl = newFiles[0].preview
                                                        const blob = await fetch(blobUrl).then(r => r.blob());
                                                        console.log(blob)
                                                        setCertFiles((prevFiles) => [...prevFiles, ...newFiles]);
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="certificate-upload" className="flex flex-col items-center">
                                                    <p>Drag and drop files here or <u>browse</u></p>
                                                </label>
                                            </div>
                                            <div className="mt-4">
                                                {certfiles.map((file: File, index: number) => (
                                                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                                                    <div className="flex items-center mb-2" key={index}>
                                                        <img src="/assets/PDF.png" alt="PDF Icon" className="w-6 h-6 mr-2" />
                                                        <div className="flex-grow">
                                                            <p className="font-medium text-sm">{file.name}</p>
                                                            <p className="text-gray-600 text-[12px]">{(file.size / 1024).toFixed(2)} KB</p>
                                                        </div>
                                                        <button
                                                            className="text-red-500 ml-4"
                                                            onClick={() => handleFileRemove(index)}
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex sm:flex-row xs:flex-col py-4 sm:items-center xs:justify-center'>
                                            <Switch size="sm" onValueChange={(val) => setFieldValue('hasCertificate', val)} />
                                            <span>My event does not have a certificate</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {steps[currentIndex] === 'email' && (
                                <>
                                   <div className='flex justify-between mb-5'>
                                        <h1 className='text-lg font-semibold'>Registration message</h1>
                                        <Link href={''} className='px-5 py-2 border border-[#161314] rounded-xl items-center'>Preview</Link>
                                   </div>
                                   <div className='bg-white px-4'>
                                        <Field 
                                            name="message" 
                                            label="Email" 
                                            as={TinyMCEField} 
                                            helpText='Customize the email sent when a guest registers for this event.'
                                            subtitle='Message (Will be emailed to guest after registration)'
                                        />
                                    </div>
                                    <div>
                                        <CheckBox name='isInfinity' label='Include link to ticket in the email.' />
                                    </div>
                                </>
                            )}
                            <div className='flex pt-5 gap-4 float-end mb-8'>
                                {(currentIndex === 0 && nextIndex === 0) ? (
                                    <Link href={'/event/list'} className='px-4 py-2 border border-[#161314] rounded-xl'>
                                        <span className='text-[#161314] text-sm'>Cancel</span>
                                    </Link>
 
                                ): (
                                    <button className='px-8 py-2 border border-[#161314] rounded-xl' onClick={() => {
                                        if (currentIndex !== 0) {
                                            setCurrentIndex(prev => prev - 1)
                                        }
                                        return setNextIndex(prev => prev - 1)
                                    }}>
                                        <span className='text-[#161314] text-sm'>Back</span>
                                    </button>
                                )}
                                {steps.length === nextIndex ? (
                                    <button type='submit' className='px-8 py-2 border bg-[#161314] rounded-xl'>
                                        <span className='text-white'>Publish event</span>
                                    </button>
                                ): (
                                    <button className='px-8 py-2 border bg-[#161314] rounded-xl' onClick={() => {
                                        if(currentIndex === 0 && nextIndex === 0) {
                                            setCurrentIndex(0)
                                            return
                                        } else if (nextIndex < steps.length) {
                                            setNextIndex(prev => prev + 1)
                                            setCurrentIndex(prev => prev + 1)
                                            return
                                        }
                                    }}>
                                        <span className='text-white'>Next</span>
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default CreateEvent