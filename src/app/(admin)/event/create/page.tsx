/* eslint-disable @next/next/no-img-element */
'use client'

import CheckBox from '@/components/checkbox'
import DateField from '@/components/date-field'
import GooglePlacesInput from '@/components/google-places-input'
import InputField from '@/components/input-field'
import InputTextArea from '@/components/input-textarea'
import NIAFileInput from '@/components/nia-fileinput'
import TextAreaField from '@/components/textarea-field'
import TextField from '@/components/textfield'
import TimeField from '@/components/timefield'
import TinyMCEField from '@/components/tinymce-field'
import { FormDesign, useCreateEventMutation, useEventFormFieldsLazyQuery, useEventFormFieldsQuery } from '@/graphql/__generated__/graphql'
import { combineDateTime } from '@/lib/common'
import { EventSchema } from '@/lib/validations'
import { Avatar, AvatarGroup, Button, ButtonGroup, Spinner, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Globe, MapPinSimpleArea, Plus, X } from '@phosphor-icons/react'
import { Field, Form, Formik } from 'formik'
import { Gift, MoneyTick, Video } from 'iconsax-react'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface FileWithPreview extends File {
    preview?: string;
}

interface EventType {
    name: string, 
    description: string,
    cpdpPoint: number,
    meetingType: string, 
    address: string, 
    link: string, 
    starts_at: string,
    ends_at: string,
    paymentType: string,
    amount: number,
    tickets: number,
    isInfinity: boolean,
    coverPhoto: string,
    formTitle: string,
    instructions: string,
    message: string,
    resources: any,
    certificate: string,
    hasCertificate: boolean,
    speakers: any,
    sponsors: any
    sendTag: boolean,
    starts_at_time: string,
    ends_at_time: string
}

const CreateEvent = () => {
    const router = useRouter()
    const [base64, setBase64] = useState<string>()
    const [speakerImg, setSpeakerImg] = useState<string>()
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [certfiles, setCertFiles] = useState<FileWithPreview[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(1)
    const [speakers, setSpeakers] = useState<any>([])
    const [form, setForm] = useState<{title: string, name: string, about: string, avatar: string}>({
        name: '',
        title: '',
        about: '',
        avatar: ''
    })

    const [getFormDesign] = useEventFormFieldsLazyQuery({fetchPolicy: 'no-cache'})

    const [formFields, setFormFields] = useState<any>()
    const [selectedFields, setSelectedFields] = useState<any>([])
    const [registerEvent, {loading, error}] = useCreateEventMutation()


    const steps = ['details', 'speakers', 'form', 'resources', 'email']
    const EventProps: EventType = {
        name: '', 
        description: '',
        cpdpPoint: 0,
        meetingType: 'Physical', 
        address: '', 
        link: '', 
        starts_at: moment(new Date()).format('Y-MM-D'),
        ends_at: moment(new Date()).format('Y-MM-D'),
        paymentType: 'Free',
        amount: 0,
        tickets: 0,
        isInfinity: false,
        coverPhoto: '',
        formTitle: '',
        instructions: '',
        message: '',
        resources: [],
        certificate: '',
        hasCertificate: false,
        speakers: speakers,
        sponsors: [],
        sendTag: false,
        starts_at_time: '',
        ends_at_time: ''
    }

    useEffect(() => {
        document.title = `Create Event | NIA-Kd`;
        (async () => {
            const res = await getFormDesign()
            if(res.data?.eventFormFields) {
                setFormFields(res.data.eventFormFields)
            }
        })()
    }, [getFormDesign])

    const getFormFields = 

    console.log(selectedFields)

    const handleResourceRemove = (columnKey: number, resources: any, setFieldValue: any) => {
        setFiles((prevFiles) => prevFiles.filter((file, index) =>  index !== columnKey));
        const newResources = resources.filter((resource: any, index: number) => index !== columnKey)
        setFieldValue(newResources)
    };

    const handleCertificateRemove = (columnKey: number, certificate: any) => {
        setCertFiles((prevFiles) => prevFiles.filter((file, index) => index !== columnKey));
        certificate.filter((cert: any, index: number) => index !== columnKey)
    };

    const handleSponsorRemove = (columnKey: number, sponsors: any, setFieldValue: any) => {
        const newSponsor = sponsors.filter((sponsor: any, index: number) => index !== columnKey)
        setFieldValue('sponsors', newSponsor)
    };

    const toggleRequired = (e: boolean, id: string) => {
        if (e) {
            const selectedItems = { ...formFields?.find((item: FormDesign) => item.id === id), required: true }
            setSelectedFields([...selectedFields, selectedItems])

            const filteredItems = {...formFields?.find((item: FormDesign) => item.id === id), required: true }
            setFormFields([...formFields, filteredItems])
        } else {
            const filteredItems ={ ...formFields?.find((item: FormDesign) => item.id === id), required: false}
            setFormFields([...formFields, filteredItems])
        }
    }

    const addSpeaker = () => {
        if(!form) return
        setSpeakers([...speakers, form])
        setForm({
            name: '',
            title: '',
            about: '',
            avatar: ''
        })
        setSpeakerImg(undefined)
    }

    const removeSpeaker = (name: string) => speakers.filter((s: any) => s.name !== name)
    
    const renderCell = React.useCallback((speaker: {title: string, name: string, avatar: string, about: string}, columnKey: React.Key) => {
        const cellValue = speaker[columnKey as keyof {title: string, name: string, avatar: string, about: string}];
    
        switch (columnKey) {
            case "name":
                return (
                    <div className='flex flex-row space-x-5'>
                        <AvatarGroup
                            max={1}
                            total={1}
                            renderCount={() => (
                                <p className="text-small text-foreground font-medium ms-2">{speaker.name}</p>
                            )}
                        >
                            <Avatar 
                                src={speaker.avatar} className='h-10 w-10' 
                                name={speaker.name}
                            />
                        </AvatarGroup>
                    </div>
                )
            case 'action':
                return (
                    <button
                        className="text-red-500 ml-4"
                        onClick={() => removeSpeaker(speaker.name)}
                    >
                        <X size={12} />
                    </button>
                )
            default:
                return cellValue;
        }
    }, [removeSpeaker]);  

    const renderFormFieldCell = React.useCallback((field: FormDesign, columnKey: React.Key) => {
        const cellValue = field[columnKey as keyof FormDesign];
    
        switch (columnKey) {
            case "detail":
                return (
                    <div className='flex flex-row space-x-5'>
                        <span>{field.label}</span>
                    </div>
                )
            case 'include': 
                return (
                    <Switch size='sm' color={field.required ? 'success' : 'default'} onValueChange={(e: boolean) => {
                        if (e) {
                            const selectedItems = formFields?.find((item: { id: any }) => item.id === field.id)
                            setSelectedFields((prev: any) => [...prev, selectedItems])
                        }
                        else {
                            const curr = selectedFields[columnKey]

                            const filtered = selectedFields.filter((item: { id: any }) => {
                                return item.id = curr.id
                            })

                            console.log(curr)
                            setSelectedFields(filtered)
                            console.log(selectedFields)
                        }
                    }} />
                )
            case 'required':
                return (
                    <Switch size='sm' defaultSelected={field.required as boolean} color={field.required ? 'success' : 'default'} onValueChange={(e: boolean) => toggleRequired(e, field.id as string)} />
                )
            default:
                return cellValue;
        }
    }, []); 

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
                    initialValues={EventProps}
                    //validationSchema={EventSchema}
                    onSubmit={async(values) => {
                        try {
                            const regForm = formFields.map((item: FormDesign) => {
                                return {
                                    name: item?.name,
                                    label: item?.label,
                                    type: item?.type,
                                    required: item?.required
                                }
                            })

                            console.log(regForm)

                            console.log(selectedFields)
                            const res = await registerEvent({
                                variables: {
                                    input: {
                                        name: values.name,
                                        description: values.description,
                                        cpdpPoint: values.cpdpPoint,
                                        type: values.meetingType,
                                        link: values.link,
                                        address: values.address,
                                        starts_at: combineDateTime(values.starts_at, values.starts_at_time),
                                        starts_time: values.starts_at_time,
                                        ends_at: combineDateTime(values.ends_at, values.ends_at_time),
                                        ends_time: values.ends_at_time,
                                        paymentType: values.paymentType,
                                        amount: values.amount,
                                        tickets: values.tickets,
                                        isInfinity: values.isInfinity,
                                        coverPhoto: values.coverPhoto,
                                        formTitle: values.formTitle,
                                        instructions: values.instructions,
                                        message: values.message,
                                        form: regForm,
                                        resources: values.resources,
                                        certificate: values.certificate,
                                        hasCertificate: values.hasCertificate,
                                        speakers: speakers,
                                        sponsors: values.sponsors,
                                        sendTag: values.sendTag
                                    }
                                }
                            })

                            if(res.data?.createEvent?.success) {
                                toast.success(res.data.createEvent.message)
                                return router.back()
                            }
                        } catch (error: any) {
                            console.log(error)
                            toast.error(error.message)
                        }
                    }}
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
                                        }} base64={base64} className='flex w-full h-full object-fit' />
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
                                            {/* <Field name='description' label="About event" as={CKEditorField} /> */}
                                            <Field name="description" label="About event" as={TinyMCEField} />
                                            <TextField 
                                                name='cpdpPoint' 
                                                label='CPDP Points'
                                                type='number'
                                                min={0}
                                                placeholder={'0'} 
                                            />
                                       </div>
                                    </div>
                                    <div className='mt-4 bg-white py-4'>
                                        <div className='pb-3 px-4'>
                                            <h1 className='text-sm font-medium'>Location</h1>
                                            <span className='text-[13px] text-[#5D5D5D]'>Let users know if the event is virtual or physical</span>
                                        </div>
                                        <hr />
                                        <div className='flex flex-col px-4 pt-5'>
                                            <h1 className='text-sm pb-1'>Where is the event taking place?</h1>
                                            <div className='flex shadow-sm bg-[#ECECEE] p-[2px] sm:w-60 xs:w-full mb-3'>
                                                <ButtonGroup
                                                    className='rounded-none w-full'
                                                    variant='flat'
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            setFieldValue('meetingType', 'Physical')
                                                            setFieldValue('link', '')
                                                        }}
                                                        type='button'
                                                        className={`flex w-1/2 p-2 rounded-none space-x-2 items-center justify-center ${values.meetingType === 'Physical' && 'bg-white shadow-lg'}`}
                                                    >
                                                        <Globe size={20} color={`${values.meetingType === 'Physical' ? '#161314': '#636363'}`} />
                                                        <span className={`text-sm ${values.meetingType === 'Physical' ? 'text-[#161314]' : 'text-[#636363]'}`}>In person</span>
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setFieldValue('meetingType', 'Online')
                                                            setFieldValue('address', '')
                                                        }}
                                                        type='button'
                                                        className={`flex w-1/2 p-2 h-full space-x-2 items-center justify-center ${values.meetingType === 'Online' && 'bg-white shadow-lg'}`}
                                                    >
                                                        <Video size={20} color={`${values.meetingType === 'Online' ? '#161314': '#636363'}`} />
                                                        <span className={`text-sm ${values.meetingType === 'Online' ? 'text-[#161314]' : 'text-[#636363]'}`}>Online</span>
                                                    </Button>
                                                </ButtonGroup>
                                                {/* <button onClick={() => {
                                                    setFieldValue('meetingType', 'Physical')
                                                    setFieldValue('link', '')
                                                }} className={`flex w-1/2 p-2 space-x-2 items-center justify-center ${values.meetingType === 'Physical' && 'bg-white shadow-lg'}`}>
                                                    <Globe size={20} color={`${values.meetingType === 'Physical' ? '#161314': '#636363'}`} />
                                                    <span className={`text-sm ${values.meetingType === 'Physical' ? 'text-[#161314]' : 'text-[#636363]'}`}>In person</span>
                                                </button>
                                                <button onClick={() => {
                                                    setFieldValue('meetingType', 'Online')
                                                    setFieldValue('address', '')
                                                }} className={`flex w-1/2 p-2 h-full space-x-2 items-center justify-center ${values.meetingType === 'Online' && 'bg-white shadow-lg'}`}>
                                                    <Video size={20} color={`${values.meetingType === 'Online' ? '#161314': '#636363'}`} />
                                                    <span className={`text-sm ${values.meetingType === 'Online' ? 'text-[#161314]' : 'text-[#636363]'}`}>Online</span>
                                                </button> */}
                                            </div>
                                            {values.meetingType === 'Physical' ? (
                                                <GooglePlacesInput 
                                                    name='address' 
                                                    label='Event address'
                                                    type='search'
                                                    placeholder='Event Address' 
                                                    onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                                                        setFieldValue('address', place.formatted_address)
                                                    }}
                                                    LeftIcon={<MapPinSimpleArea size={20} />}
                                                    className='mt-3'
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
                                                <h1 className='text-sm pb-1'>How do you plan on hosting this event?</h1>
                                                <div className='flex shadow-sm bg-[#ECECEE] p-[2px] sm:w-60 xs:w-full mb-3'>
                                                    <ButtonGroup
                                                        className='rounded-none w-full'
                                                        variant='flat'
                                                    >
                                                        <Button
                                                            onClick={() => {
                                                                setFieldValue('paymentType', 'Free')
                                                                setFieldValue('isInfinity', false)
                                                            }}
                                                            type='button'
                                                            className={`flex w-1/2 p-2 space-x-2 items-center justify-center ${values.paymentType === 'Free' && 'bg-white shadow-lg'}`}
                                                        >
                                                            <Gift size={20} color={`${values.paymentType === 'Free' ? '#161314': '#636363'}`} />
                                                            <span className={`text-sm ${values.paymentType === 'Free' ? 'text-[#161314]' : 'text-[#636363]'}`}>Free</span>
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                setFieldValue('paymentType', 'Paid')
                                                                setFieldValue('isInfinity', false)
                                                            }}
                                                            type='button'
                                                            className={`flex w-1/2 p-2 h-full space-x-2 items-center justify-center ${values.paymentType === 'Paid' && 'bg-white shadow-lg'}`}
                                                        >
                                                            <MoneyTick size={20} color={`${values.paymentType === 'Paid' ? '#161314': '#636363'}`} />
                                                            <span className={`text-sm ${values.paymentType === 'Paid' ? 'text-[#161314]' : 'text-[#636363]'}`}>Paid</span>
                                                        </Button>
                                                    </ButtonGroup>
                                                    {/* <button onClick={() => {
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
                                                    </button> */}
                                                </div>
                                            </div>
                                            <div className='flex sm:flex-row xs:flex-col gap-4'>
                                                <TextField 
                                                    name='amount' 
                                                    label={`Amount ${'\u20a6'}`}
                                                    type='number'
                                                    placeholder='Event amount'
                                                    disabled={values.paymentType === 'Free' ? true : false} 
                                                />
                                                <TextField 
                                                    name='tickets' 
                                                    label='Set number of tickets'
                                                    placeholder='Ticket capacity' 
                                                    type='number'
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
                                <div className='bg-white'>
                                    <div className='pb-3'>
                                        <h1 className='text-lg font-semibold'>Add speakers</h1>
                                    </div>
                                    <div className='bg-white'>
                                        <div className='flex sm:flex-row xs:flex-col p-4 gap-5'>
                                            <div className='sm:w-1/3 xs:w-full'>
                                                <div className="flex justify-center items-center border-2 border-dashed p-6 text-center mb-4 cursor-pointer rounded-lg bg-[#F5F5F5] h-72">
                                                    <input
                                                        type="file"
                                                        id="speakerPix"
                                                        name='avatar'
                                                        className="hidden"
                                                        multiple
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                            if (event.target.files) {
                                                                const file = event.target.files?.[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setForm({...form, [event.target.name]: reader.result as string})
                                                                        setSpeakerImg(reader.result as string)
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <label aria-label='speakerPix' htmlFor="speakerPix" className="flex flex-col items-center py-1 px-2 rounded-lg bg-[#F3ECE2] cursor-pointer">
                                                        {speakerImg ? (
                                                            <img src={speakerImg} className='flex w-full h-full overflow-hidden' />
                                                        ): (
                                                            <p>Upload image</p>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='sm:w-2/3 xs:w-full'>
                                                <div>
                                                    <InputField 
                                                        name='name'
                                                        label='Speaker name'
                                                        value={form.name}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setForm({...form, [event.target.name]: event.target.value})} 
                                                    />
                                                    <InputField 
                                                        name='title'
                                                        value={form.title}
                                                        label='Speaker title' 
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setForm({...form, [event.target.name]: event.target.value})} 
                                                    />
                                                    <InputTextArea 
                                                        name='about'
                                                        label='About speaker (not more than 150 words)'
                                                        value={form.about}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setForm({...form, [event.target.name]: event.target.value})} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='h-[1px] bg-[#D9D9D9 w-full' />
                                        <div className='py-3 px-4'>
                                            <Button type='button' className='flex gap-3' onClick={addSpeaker}>
                                                <Plus size={20} color='#E08D14' />
                                                <span className='text-[#E08D14]'>Add speaker</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='w-full bg-white mt-4'>
                                        <Table>
                                            <TableHeader>
                                                <TableColumn key={'name'}>Name</TableColumn>
                                                <TableColumn key={'title'}>Title</TableColumn>
                                                <TableColumn key={'about'}>About speaker</TableColumn>
                                                <TableColumn key='action'>Action</TableColumn>
                                            </TableHeader>
                                            <TableBody
                                                items={speakers ?? []}
                                                loadingContent={<Spinner />}
                                                loadingState={'idle'}
                                                emptyContent={"No rows to display."}
                                            >
                                                {(speaker: {title: string, name: string, about: string, avatar: string}) => (
                                                    <TableRow key={speaker.name}>
                                                        {(columnKey) => <TableCell>{renderCell(speaker, columnKey)}</TableCell>}
                                                    </TableRow>
                                                )}
                                            </TableBody>
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
                                            <h1 className='text-lg font-medium'>Registration Form</h1>
                                            <span className='text-sm'>Create a form to allow users register for your event by providing their details.</span>
                                        </div>
                                        <div>
                                            <TextField 
                                                name='formTitle' 
                                                label={'Form title'}
                                                type='text'
                                            />
                                            <TextAreaField 
                                                name='instructions' 
                                                label={'Instructions'}
                                            />
                                        </div>
                                    </div>
                                    <div className='bg-white mt-4 w-full'>
                                        <div className='p-4'>
                                            <h1 className='text-lg font-medium'>Questions</h1>
                                            <span className='text-sm'>What do you want to know about your attendees? First, last name and email are default fields</span>
                                        </div>
                                        <div className='py-3 px-4'>
                                            <Table className='border-none rounded-none'>
                                                <TableHeader>
                                                    <TableColumn key={'detail'}>Detail</TableColumn>
                                                    <TableColumn key={'include'}>Include</TableColumn>
                                                    <TableColumn key={'required'}>Required</TableColumn>
                                                </TableHeader>
                                                <TableBody
                                                    items={formFields ?? []}
                                                    loadingContent={<Spinner color='default' />}
                                                    loadingState={'idle'}
                                                    emptyContent={"No rows to display."}
                                                >
                                                    {(field: FormDesign) => (
                                                        <TableRow key={field.id}>
                                                            {(columnKey) => <TableCell>{renderFormFieldCell(field, columnKey)}</TableCell>}
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
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
                                                        const reader = new FileReader();
                                                        newFiles.forEach((resr: File, index: number) => {
                                                            reader.onloadend = () => {
                                                                setFieldValue('resources', [...values.resources, {resourceUrl: reader.result as string, name: resr.name}]);
                                                            }
                                                            reader.readAsDataURL(resr)
                                                        })
                                                        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                                                    }
                                                }}
                                            />
                                            <label aria-label='file-upload' htmlFor="file-upload" className="flex flex-col items-center">
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
                                                        onClick={() => handleResourceRemove(index, values.resources, setFieldValue)}
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='pt-6'>
                                            <div>
                                                <h1 className='pb-3 font-medium'>Partners</h1>
                                            </div>
                                            <div className="border-2 border-dashed p-6 text-center mb-4 cursor-pointer rounded-lg">
                                                <input
                                                    type="file"
                                                    id="sponsor-upload"
                                                    className="hidden"
                                                    accept="image/png"
                                                    multiple
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        if (event.target.files) {
                                                            const newFiles = Array.from(event.target.files).filter((file) =>
                                                                file.type === 'image/png'
                                                            ).map((file) => Object.assign(file, {
                                                                    preview: URL.createObjectURL(file)
                                                                })
                                                            );
                                                        
                                                            newFiles.map((spr, index: number) => {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setFieldValue('sponsors', [...values.sponsors, reader.result as string])
                                                                };
                                                                reader.readAsDataURL(spr);
                                                            })
                                                        }
                                                    }}
                                                />
                                                <label aria-label='sponsor-upload' htmlFor="sponsor-upload" className="flex flex-col items-center">
                                                    <p>Drag and drop files here or <u>browse</u></p>
                                                </label>
                                            </div>
                                            <div className="grid sm:grid-cols-4 gap-3 mt-4">
                                                {values.sponsors.map((file: any, index: number) => (
                                                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                                                    <div className="items-center mb-2" key={index}>
                                                        <img src={file} alt="PDF Icon" className="w-16 h-16 mr-2" />
                                                        <button
                                                            type='button'
                                                            className="flex space-x-2 text-red-500 items-center"
                                                            onClick={() => handleSponsorRemove(index, values.sponsors, setFieldValue)}
                                                        >
                                                            <X size={12} /> Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
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
                                                    accept="image/png, image/jpeg, image/jpg"
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
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setFieldValue('certificate', reader.result as string);
                                                            };
                                                            reader.readAsDataURL(event.target.files[0]);
                                                            console.log(values.certificate)
                                                            setCertFiles((prevFiles) => [...prevFiles, ...newFiles]);

                                                        }
                                                    }}
                                                />
                                                <label aria-label='certificate-upload' htmlFor="certificate-upload" className="flex flex-col items-center">
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
                                                            type='button'
                                                            className="text-red-500 ml-4"
                                                            onClick={() => handleCertificateRemove(index, values.certificate)}
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex sm:flex-row xs:flex-col py-4 sm:items-center xs:justify-center'>
                                            <Switch size="sm" onValueChange={(val) => {
                                                if(val) {
                                                    setFieldValue('certificate', '')
                                                    setCertFiles([])
                                                }
                                            }} />
                                            <span>My event does not have a certificate</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {steps[currentIndex] === 'email' && (
                                <div className='w-full'>
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
                                    <div className='w-full'>
                                        <CheckBox name='sendTag' label='Include link to ticket in the email.' />
                                    </div>
                                </div>
                            )}
                            <div className='flex pt-5 gap-4 float-end mb-8'>
                                {(currentIndex === 0 && nextIndex === 0) ? (
                                    <Link href={'/event/list'} className='px-4 py-2 border border-[#161314] rounded-xl'>
                                        <span className='text-[#161314] text-sm'>Cancel</span>
                                    </Link>
 
                                ): (
                                    <Button type='button' className='px-8 py-2 border border-[#161314] rounded-xl' onClick={() => {
                                        if (currentIndex !== 0) {
                                            setCurrentIndex(prev => prev - 1)
                                        }
                                        return setNextIndex(prev => prev - 1)
                                    }}>
                                        <span className='text-[#161314] text-sm'>Back</span>
                                    </Button>
                                )}
                                {Number(steps.indexOf('email')) === currentIndex && (
                                     <Button type='submit' className='px-8 py-2 border bg-[#161314] rounded-xl' disabled={loading}>
                                        <span className='text-white'>{loading? 'Please wait...' : 'Publish event'}</span>
                                    </Button>
                                )}
                                {Number(steps.indexOf('email')) !== currentIndex && (
                                    <Button type='button' className='px-8 py-2 border bg-[#161314] rounded-xl' onClick={() => {
                                        if(currentIndex === 0 && nextIndex === 0) {
                                            setCurrentIndex(0)
                                        } else if (nextIndex < steps.length) {
                                            setNextIndex(prev => prev + 1)
                                            setCurrentIndex(prev => prev + 1)
                                        }
                                    }}>
                                        <span className='text-white'>Next</span>
                                    </Button>
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

function setFieldValue(arg0: string, newSponsor: any) {
    throw new Error('Function not implemented.')
}
