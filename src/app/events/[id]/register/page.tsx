'use client'

import SubmitButton from '@/components/submit-button';
import TextInputWithLabel from '@/components/textinput-with-label';
import { RegistrationForm } from '@/types/event';
import { Form, Formik, FormikHelpers } from 'formik'
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import * as Yup from 'yup'


const RegistrationSchema = Yup.object().shape({
	regId: Yup.string().required('Membership ID is required'),
	password: Yup.string().required('Password is required'),
	email: Yup.string().email()
  });

const EventRegistration = () => {
	const initialValues: RegistrationForm = { regId: '', password: '' };
	const { id } = useParams()
	console.log(id)
	
    return (
      	<div className='flex flex-col justify-center py-7 px-60 my-16 w-full'>
			<div className='flex justify-between items-center pt-6 w-full'>
				<Link href={'/events'} className='flex items-center space-x-2 '>
					<ArrowLeft variant='Outline' size={20} className='rgb(82 71 75 / 0.7)' />
					<span className='text-[14px] text-[#52474B]/70'>Back to events ({id})</span>
				</Link>
			</div>
			<div className='mt-10'>
				<h1 className='text-[24px] font-semibold'>Innovate Architecture Conference registration</h1>
				<span className='text-[#1E1A1C]'>Fill in your details to register for this event</span>
			</div>
			<div className='py-8'>
				<div className=''>
					<Formik 
						initialValues={initialValues}
						validationSchema={RegistrationSchema}
						onSubmit={(values: RegistrationForm, { setSubmitting }: FormikHelpers<RegistrationForm>) => {
							console.log(values);
							setSubmitting(false)
						}}
					>
						{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
							<form className='grid grid-cols-2 gap-4'>
								<div>
									<TextInputWithLabel 
										type='text'
										name='first_name'
										label='First Name'
										className='w-full'
									/>
									<TextInputWithLabel 
										type='email'
										name='email'
										label='Email address'
										className='w-full'
									/>
									<TextInputWithLabel 
										type='tel'
										name='phonenumber'
										label='Phone number'
										className='w-full'
									/>
									<TextInputWithLabel 
										type='text'
										name='city'
										label='City'
										className='w-full'
									/>
								</div>
								<div>
									<TextInputWithLabel 
										type='text'
										name='last_name'
										label='Last Name'
										className='w-full'
									/>
									<TextInputWithLabel 
										type='text'
										name='gender'
										label='Gender'
										className='w-full'
									/>
									<TextInputWithLabel 
										type='text'
										name='address'
										label='Address'
										className='w-full'
									/>
									<TextInputWithLabel 
										type='text'
										name='state'
										label='State'
										className='w-full'
									/>
									<div className='flex float-end space-x-3'>
										<SubmitButton 
											name='Cancel' 
											type='reset' 
											className='border border-gray-400 text-black/70 item-center rounded-xl text-sm w-28 h-11'
										/>
										<SubmitButton 
											name='Register' 
											type='submit' 
											disabled={isSubmitting} 
											className='bg-black text-white item-center rounded-xl text-sm w-32 h-11'
										/>
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
    )
}

export default EventRegistration