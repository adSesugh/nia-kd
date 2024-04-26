'use client'

import SubmitButton from '@/components/submit-button';
import TextInputWithLabel from '@/components/textinput-with-label';
import { RegistrationForm } from '@/types/event';
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'


const RegistrationSchema = Yup.object().shape({
	regId: Yup.string().required('Membership ID is required'),
	password: Yup.string().required('Password is required'),
	email: Yup.string().email()
  });

const EventRegistration = () => {
	const initialValues: RegistrationForm = { regId: '', password: '' };
    return (
      	<div className='flex flex-col justify-center py-7 px-60 mt-32 w-full'>
			<div className=''>
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
								</div>
								<div className='flex'>
								<SubmitButton 
									name='Cancel' 
									type='reset' 
									className='wrf text-white item-center rounded-3xl text-sm w-full h-11'
								/>
								<SubmitButton 
									name='Register' 
									type='submit' 
									disabled={isSubmitting} 
									className='bg-black text-white item-center rounded-3xl text-sm w-full h-11'
								/>
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