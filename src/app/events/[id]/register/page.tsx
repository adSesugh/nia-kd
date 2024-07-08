'use client'

import SubmitButton from '@/components/submit-button';
import { RootState } from '@/features/store';
import { useGetRegistrationFormQuery, usePostEventRegistrationMutation } from '@/graphql/__generated__/graphql';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PaystackButton } from 'react-paystack';
import { HookConfig } from 'react-paystack/dist/types';
import { Button } from '@nextui-org/react';


const EventRegistration = () => {
	const { id } = useParams()
	const [formData, setFormData] = useState({
		phoneNumber: '',
		email: ''
	})
	const [amount, setAmount] = useState<number>(0)
	const user = useSelector((state: RootState) => state?.auth?.userData.user)
	const {data } = useGetRegistrationFormQuery({
		fetchPolicy: 'no-cache',
		variables: {
			eventId: id
		}
	})

	useEffect(() => {
		if(data?.getRegistrationForm) {
			const amount = Number(data?.getRegistrationForm?.amount) * 100
			setAmount(amount)
		}
	}, [id, data?.getRegistrationForm?.amount, amount])

	console.log(data?.getRegistrationForm?.amount)

	const [config, setConfig] = useState<HookConfig>(
		{
		  reference: (new Date()).getTime().toString(),
		  amount: amount,
		  email: formData.email || user?.member?.email,
		  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
		}
	)

	const [postEventRegistration, {loading}] = usePostEventRegistrationMutation()

	const handlePaystackCloseAction = () => {
		console.log('closed')
	}

	const handlePaystackSuccessAction = async (reference: any) => {
		try {
		  	const res = await postEventRegistration({
			variables: {
				input: {
					memberId: user?.member?.id,
					eventId: id as string,
					registrantDetail: {...formData},
					payment: {
						paymentType: 'event',
						memberId: user?.member?.id,
						eventId: id as string,
						description: data?.getRegistrationForm?.name,
						phoneNumber: formData['phoneNumber'],
						paymentRef: reference.trxref,
						amount: data?.getRegistrationForm?.amount,
						status: reference.status === 'success' ? 'Successful' : 'Unsuccessful',
					}
				}
			}
		  })
		  if(res.data?.postEventRegistration){
			toast.success('Event registered')
		  }
		} catch (error: any) {
			console.log(error)
		  	toast.error(error.messge)
		}
	};

	const componentProps = {
		...config,
		text: 'Register',
		onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

	const handleRegistration = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const res = await postEventRegistration({
			variables: {
				input: {
					memberId: user?.member?.id,
					eventId: id as string,
					registrantDetail: {...formData}
				}
			}
			})
			if(res.data?.postEventRegistration){
				toast.success('Event registered')
			}
		} catch (error: any) {
			console.log(error.message)
			toast.error(error.messge)
		}
	}

	
    return (
      	<div className='flex flex-col justify-center py-7 sm:px-60 xs:px-6 my-16 w-full'>
			<div className='flex justify-between items-center pt-6 w-full'>
				<Link href={'/events'} className='flex items-center space-x-2 '>
					<ArrowLeft variant='Outline' size={20} className='rgb(82 71 75 / 0.7)' />
					<span className='text-[14px] text-[#52474B]/70'>Back to events ({data?.getRegistrationForm?.name})</span>
				</Link>
			</div>
			<div className='mt-10'>
				<h1 className='text-[24px] font-semibold'>{data?.getRegistrationForm?.formTitle}</h1>
				<span className='flex flew-wrap text-[#1E1A1C]'>{data?.getRegistrationForm?.instructions}</span>
			</div>
			<div className='py-8'>
				<form method='POST' onSubmit={handleRegistration}>
					<div className='grid sm:grid-cols-2 xs:grid-cols-1 gap-4'>
						{data?.getRegistrationForm?.eventForms?.map(form => (
							<div className={`mb-2 text-[14px]`} key={form?.id}>
								<div className='py-1'>
									<h3>{form?.label}</h3>
								</div>
								<input 
									key={form?.id}
									type={form?.type}
									name={form?.name as string}
									placeholder={form?.label} 
									required={form?.required as boolean}
									onChange={e => setFormData({...formData, [`${form?.name}`]: e.target.value})}
									className={`block w-full rounded-md h-11 border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
								/>
							</div>
						))}
						<div>
							<div className='flex float-end items-center space-x-3'>
								<SubmitButton 
									name='Cancel' 
									type='reset' 
									className='border border-gray-400 text-black/70 item-center rounded-xl text-sm w-28 h-11'
								/>
								{data?.getRegistrationForm?.paymentType === 'Free' || Number(data?.getRegistrationForm?.amount) === 0 ? (
									<Button 
										name='Register' 
										type='submit' 
										className='bg-black text-white item-center rounded-xl text-sm w-32 h-11'
									>
										Register
									</Button>
								):(
									<Button 
										name='Register' 
										type='submit' 
										onClick={() => {
											const totalAmount = amount
											setConfig({...config, email: formData.email, amount: totalAmount})
										}}
										className='bg-black text-white item-center rounded-xl text-sm w-32 h-11'
									>
										<PaystackButton 
											amount={amount} 
											email={formData.email || user?.member?.email as string} 
											reference={(new Date()).getTime().toString()}
											{...componentProps} 
										/>
									</Button>
								)}
							</div>
						</div>
					</div>
				</form>
				{/* <div className=''>
					<Formik 
						initialValues={{any: ''}}
						onSubmit={async (values, { setSubmitting }) => {
							console.log(values);
							try {
								const res = await postEventRegistration({
									variables: {
										eventId: id,
										input: {
											memberId: user?.member?.id,
											eventId: id as string,
											registrantDetail: {
												firstName: values?.firstName,
												lastName: values?.lastName,
												phoneNumber: values.phoneNumber,
												gender: values.gender
											},
											payment: {
												paymentType: 'Event',
												memberId: user?.member?.id,
												eventId: id as string,
												description: data?.getRegistrationForm?.name,
												phoneNumber: values.phoneNumber,
												paymentRef: reference.trxref,
												amount: data?.getRegistrationForm?.amount,
												status: reference.status === 'success' ? 'Successful' : 'Unsuccessful',
											}
										}
									}
								})
							} catch (error: any) {
								toast.error(error.message)
								setSubmitting(false)
							}
						}}
					>
						{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
							<form onSubmit={handleSubmit} className='grid sm:grid-cols-2 xs:grid-cols-1 gap-4'>
								{data?.getRegistrationForm?.eventForms?.map(form => (
									<TextField
										key={form?.id}
										type={form?.type}
										name={form?.name as string}
										label={form?.label}
										className='w-full'
										required={form?.required as boolean}
									/>
								))}
								<div>
									<div className='flex float-end space-x-3'>
										<SubmitButton 
											name='Cancel' 
											type='reset' 
											className='border border-gray-400 text-black/70 item-center rounded-xl text-sm w-28 h-11'
										/>
										<SubmitButton 
											name='Register' 
											type='submit' 
											//disabled={isSubmitting || data?.getRegistrationForm.eventForms?.length === 0 && true} 
											className='bg-black text-white item-center rounded-xl text-sm w-32 h-11'
										/>
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div> */}
			</div>
		</div>
    )
}

export default EventRegistration