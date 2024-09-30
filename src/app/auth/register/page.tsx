'use client'

import React, { useEffect } from 'react'
import styles from '@/styles/auth.module.css'
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { RegisterForm } from '@/types/auth';
import { Eye, EyeSlash } from 'iconsax-react';
import Link from 'next/link';
import TextField from '@/components/textfield';
import TextFieldWithIcon from '@/components/textfield-withicon';
import SubmitButton from '@/components/submit-button';
import DefaultSelect from '@/components/default-select';
import { useCreateUserMutation, useGetMembershipTypesQuery } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RegisterSchema } from '@/lib/validations';
import { Label } from 'flowbite-react';


const RegisterPage: React.FC<{}> = () => {
  const initialValues: RegisterForm = { 
    firstName: '', 
    lastName: '',
    email: '',
    phoneNumber: '',
    membershipType: '', 
    membershipId: '', 
    workplace: '',
    password: '',
    confirmPassword: '',
    checkMember: '',
    membershipSlip: ''
  };
  const [show, setShow] = React.useState<boolean>(false)
  const [createUser, {loading, error}] = useCreateUserMutation({fetchPolicy: 'no-cache'})
  const router = useRouter()

  const {data: membershipType, loading: membershipLoader} = useGetMembershipTypesQuery({fetchPolicy: 'no-cache'})

  useEffect(()=> {
    document.title = "Sign up | NIA-Kd"
  }, [])

  return (
    <div className={styles.register}>
      <h1>Sign Up</h1>
      <h2>Get started by filling the registration form below</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async(values: RegisterForm, { setSubmitting }: FormikHelpers<RegisterForm>) => {
          
          try {
            const res = await createUser({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  membershipType: values.membershipType,
                  membershipId: values.membershipId || null,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  workplace: values.workplace,
                  password: values.password,
                  proofDocument: values.membershipSlip
                }
              }
            })
            
            if(res.data?.createUser?.success){
              setSubmitting(false)
              toast.success(res.data?.createUser?.message)

              return router.push('/auth/login')
            }
          } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
            setSubmitting(false)
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue}) => (
          <Form onSubmit={handleSubmit}>
            <div className='grid sm:grid-cols-2 xs:grid-cols-1 gap-4'>
              <TextField
                name='firstName'
                placeholder='First name' 
                className={`${errors.firstName && touched.firstName ? 'ring-red-500': ''} pr-10`}
              />
              <TextField
                name='lastName'
                placeholder='Last name' 
                className={`${errors.lastName && touched.lastName ? 'ring-red-500': ''} pr-10`}
              />
            </div>
            <TextField
              name='email'
              placeholder='Email Address' 
              className={`${errors.email && touched.email ? 'ring-red-500': ''} pr-10`}
            />
            <TextField
              name='phoneNumber'
              placeholder='Phone number' 
              className={`${errors.phoneNumber && touched.phoneNumber ? 'ring-red-500': ''} pr-10`}
            />
            <DefaultSelect
              data={membershipType?.getMembershipTypes || []}
              name='membershipType'
              error={errors.membershipType}
              onChange={handleChange}
              placeholder='Select membership type'
            />
            <div className={`grid sm:${values.checkMember === 'yes' ? 'grid-cols-2' : 'grid-cols-1'} xs:grid-cols-1 gap-4`}>
              <DefaultSelect
                data={[{id: 'no', name: 'No'}, {id: 'yes', name: 'Yes'}]}
                name='checkMember'
                error={errors.checkMember}
                onChange={handleChange}
                placeholder='Registered Member?'
              />
              {values.checkMember === 'yes' && (
                <TextField
                  name='membershipId'
                  placeholder={`Membership ID (${values.checkMember === 'yes' && values.membershipSlip === '' ? 'Required' : 'Optional'})`} 
                  className={`${errors.membershipId && touched.membershipId ? 'ring-red-500': ''} pr-10`}
                />
              )}
            </div>
            <TextField
              name='workplace'
              placeholder='Workplace'
              className={`${errors.workplace && touched.workplace ? 'ring-red-500': ''} pr-10`}
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
            {values.checkMember === 'no' && (
              <Field name="file">
                {() => (
                  <>
                    <Label className='text-gray-500'>Upload proof of membership (Required)</Label>
                    <input
                      type="file"
                      name="membershipSlip"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setFieldValue('membershipSlip', reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                      }}
                      className={`${errors.membershipSlip && touched.membershipSlip ? 'ring-red-500 pr-10': 'pr-10'} block w-full rounded-md h-11 border-0 focus:border focus:border-gray-400 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
                    />
                  </>
                )}
              </Field>
            )}
            
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