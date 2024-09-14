'use client'

import SubmitButton from '@/components/submit-button';
import { RootState } from '@/features/store';
import { useGetRegistrationFormQuery, usePostEventRegistrationMutation } from '@/graphql/__generated__/graphql';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Spinner } from '@nextui-org/react';
import { PRIMARY_ONE } from '@/constant/Colors';
import NIAFooter from '@/components/footer';


const EventRegistration = () => {
	const { id } = useParams()
	const router = useRouter()
	const [formData, setFormData] = useState({})
	const [amount, setAmount] = useState<number>(0)
	const user = useSelector((state: RootState) => state?.auth.userData.user)
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
		window.localStorage.removeItem('regData')
	}, [id, data?.getRegistrationForm?.amount, amount])

	const [postEventRegistration, {loading}] = usePostEventRegistrationMutation()

	const handleRegistration = async () => {
		try {
			const res = await postEventRegistration({
			variables: {
				input: {
					memberId: user?.member?.id,
					eventId: id as string,
					registrantDetail: {...formData},
					payment: null
				}
			}
			})
			
			if(res.data?.postEventRegistration?.id){
				toast.success('Event registered')
				return router.push('/events')
			}
		} catch (error: any) {
			toast.error(error.messge)
		}
	}

	if(user?.member){
		window.localStorage.removeItem('regData')
		return router.push(`/events/${id}/payment`)
	} else {
		return (
			<div>
				<div className={`flex flex-col justify-center py-7 sm:px-96 xs:px-6 mt-16 w-full bg-[${PRIMARY_ONE}]`}>
					<div>
						<div className='flex justify-between items-center pt-6 w-full'>
							<Link href={'/events'} className='flex items-center space-x-2 '>
								<ArrowLeft variant='Outline' size={20} className='rgb(82 71 75 / 0.7)' />
								<span className='text-[14px] text-[#52474B]/70'>Back to events ({data?.getRegistrationForm?.name})</span>
							</Link>
						</div>
					</div>
					<div className={`bg-white shadow-sm rounded-3xl my-16 overflow-hidden`}>
						<div className='h-[20%] w-full overflow-hidden'>
							<img 
								src={data?.getRegistrationForm?.coverPhoto || '/assets/events/event-detail.svg'} 
								alt={data?.getRegistrationForm?.name as string || 'event cover'}
								className='h-72 w-full overflow-hidden'
							/>
						</div>
						<div className='mt-10 sm:px-10 xs:px-3'>
							<h1 className='text-[24px] font-semibold'>{data?.getRegistrationForm?.formTitle}</h1>
							<span className='flex flew-wrap text-[#1E1A1C]'>{data?.getRegistrationForm?.instructions}</span>
						</div>
						<div className='py-8 sm:px-10 xs:px-3'>
							<form method='POST'>
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
								</div>
								<div>
									<div className='flex float-end items-center space-x-3 pt-6 pb-4'>
										<SubmitButton 
											name='Cancel' 
											type='reset' 
											className='border border-gray-400 text-black/70 item-center rounded-xl text-sm w-28 h-11'
										/>
										{loading ? (
											<button className='flex space-x-2 justify-center items-center px-4 bg-black text-white rounded-xl text-sm h-11'>
												<Spinner size='sm' color='default' />
												<span>Please wait...</span>
											</button>
										):(
											<>
												{data?.getRegistrationForm?.paymentType === 'Free' || Number(data?.getRegistrationForm?.amount) === 0 ? (
													<button 
														name='Register' 
														type='submit' 
														disabled={loading}
														onClick={handleRegistration}
														className='bg-black text-white item-center rounded-xl text-sm w-32 h-11'
													>
														Register
													</button>
												):(
													<button
														onClick={(e) => {
															e.preventDefault()
															if(Object.keys(formData).length === data?.getRegistrationForm?.eventForms?.length){
																window.localStorage.setItem('regData', JSON.stringify(formData))
																router.push(`/events/${id}/payment`)
															}
															return
														}}
														className='flex justify-center items-center bg-black text-white item-center rounded-xl text-sm w-44 h-11'
													>
														Continue to payment
													</button>
												)}
													{/* <Button 
														name='Register' 
														type='submit' 
														onMouseEnter={() => {
															const totalAmount = amount
															setConfig({...config, email: formData.email, amount: totalAmount})
														}}
														onClick={() => {
															const totalAmount = amount
															setConfig({...config, email: formData.email, amount: totalAmount})
														}}
														className='bg-black text-white item-center rounded-xl text-sm w-32 h-11'
														as={'div'}
														disabled={formData.email !== undefined ? false : true}
													>
														<PaystackButton 
															amount={amount} 
															email={formData.email || user?.member?.email as string} 
															reference={(new Date()).getTime().toString()}
															{...componentProps} 
														/>
													</Button>
												)} */}
											</>
										)}
										
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<NIAFooter />
			</div>
	  	)
	}
}

export default EventRegistration