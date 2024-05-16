'use client'

import React from 'react'
import styles from '@/styles/auth.module.css'
import { Form, Formik, FormikHelpers } from 'formik';
import { RegisterForm } from '@/types/auth';
import { Eye, EyeSlash, Lock } from 'iconsax-react';
import Link from 'next/link';
import * as Yup from 'yup'
import TextField from '@/components/textfield';
import TextFieldWithIcon from '@/components/textfield-withicon';
import SubmitButton from '@/components/submit-button';
import DefaultSelect from '@/components/default-select';
import { useCreateUserMutation } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email Address is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  membershipId: Yup.string().nullable(),
  membershipType: Yup.string().nullable(),
  address: Yup.string().required('Resident Address is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be 6 or more characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must match')
});

const membershipType = [
  {
    id: "STUDENT",
    name: "Student"
  },
  {
    id: "GRADUATE",
    name: "Graduate/Technologist"
  },
  {
    id: "ASSOCIATE",
    name: "Associate"
  },
  {
    id: "Full Member",
    name: "Full Member"
  },
  {
    id: "Fellow",
    name: "Fellow"
  }
]

const RegisterPage: React.FC<{}> = () => {
  const initialValues: RegisterForm = { 
    firstName: '', 
    lastName: '',
    email: '',
    phoneNumber: '',
    membershipType: '', 
    membershipId: '', 
    address: '',
    password: '',
    confirmPassword: '' 
  };
  const [show, setShow] = React.useState<boolean>(false)
  const [createUser, {loading, error}] = useCreateUserMutation()
  const router = useRouter()

  return (
    <div className={styles.register}>
      <h1>Sign Up</h1>
      <h2>Get started by filling the registration form below</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async(values: RegisterForm, { setSubmitting }: FormikHelpers<RegisterForm>) => {
      
          try {
            const res = await createUser({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  membershipType: values.membershipType.toUpperCase(),
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  address: values.address,
                  password: values.password
                }
              }
            })
            
            setSubmitting(false)
            toast.success("Created successfully")
            if(res.data?.createUser?.success){
              return router.push('/auth/login')
            }
          } catch (error: any) {
            toast.error("Whoops! error occurred")
            setSubmitting(false)
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange, isSubmitting, }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              name='firstName'
              placeholder='First name' 
              className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
            />
            <TextField
              name='lastName'
              placeholder='Last name' 
              className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
            />
            <TextField
              name='email'
              placeholder='Email Address' 
              className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
            />
            <TextField
              name='phoneNumber'
              placeholder='Phone number' 
              className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
            />
            <DefaultSelect
              data={membershipType}
              name='membershipType'
              label='Membership type'
              error={errors.firstName}
              onChange={handleChange}
            />
            <TextField
              name='membershipId'
              placeholder='Membership ID' 
              className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
            />
            <TextField
              name='address'
              placeholder='Resident Address'
              className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
            />
            <TextFieldWithIcon 
              name='password' 
              placeholder='Password' 
              type={show ? 'text' : 'password'} 
              className={errors.password && touched.password ? 'ring-red-500': ''}
              RightIcon={show ? <Eye onClick={() => setShow(false)} size={20} color="gray" variant="Outline" /> : <EyeSlash size={20} onClick={() => setShow(true)} color="gray" variant="Outline" />}
            />
            <TextField
              name='confirmPassword' 
              placeholder='Confirm password' 
              type={show ? 'text' : 'password'} 
              showError={true}
              className={errors.confirmPassword && touched.confirmPassword ? 'ring-red-500 pr-10 mt-4': 'pr-10 mt-4'}
            />
            <SubmitButton 
                name={isSubmitting || loading ? "Please wait..." : 'Register'} 
                type='submit' 
                disabled={isSubmitting || loading} 
                className='bg-black text-white item-center rounded-3xl text-sm w-full h-11'
              />
          </Form>
        )}
      </Formik>
      <div className='flex justify-center items-center md:mb-4 mt-6 xs:mb-2'>
          <span className='sm:text-sm pr-1 xs:text-[12px]'>
            Already a member?
          </span>
          <span className='sm:text-sm xs:text-[12px] underline text-gray-800 font-semibold'>
            <Link href={'/auth/login'}>Log in</Link>
          </span>
      </div>
    </div>
  )
}

export default RegisterPage