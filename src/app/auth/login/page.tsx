'use client'

import React, { useEffect } from 'react'
import styles from '@/styles/auth.module.css'
import { Form, Formik, FormikHelpers,  } from 'formik'
import * as Yup from 'yup'
import { LoginForm } from '@/types/auth';
import Link from 'next/link'
import CheckBox from '@/components/checkbox'
import { Profile, Lock, EyeSlash, Eye } from 'iconsax-react'
import TextFieldWithIcon from '@/components/textfield-withicon'
import SubmitButton from '@/components/submit-button'

const LoginSchema = Yup.object().shape({
  regId: Yup.string().required('Membership ID is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().email()
});

const LoginPage: React.FC<{}> = () => {
  const initialValues: LoginForm = { regId: '', password: '' };
  const [show, setShow] = React.useState<boolean>(false)

  return (
    <div className={styles.login}>
      <h1>Log in</h1>
      <h2>Log in to your NIA Kaduna Chapter account</h2>
     <Formik
       initialValues={initialValues}
       validationSchema={LoginSchema}
       onSubmit={(values: LoginForm, { setSubmitting }: FormikHelpers<LoginForm>) => {
         console.log(values);
         setSubmitting(false)
       }}
     >
       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
         <Form onSubmit={handleSubmit}>
           <TextFieldWithIcon 
              name='regId' 
              placeholder='NIA Membership ID' 
              type='text' 
              LeftIcons={<Profile size={20} color={errors.regId && touched.regId ? 'red': 'gray'} variant="Outline" />}
              className={errors.regId && touched.regId ? 'ring-red-500': 'pr-3'}
            />
           <TextFieldWithIcon 
              name='password' 
              placeholder='Password' 
              type={show ? 'text' : 'password'} 
              className={errors.password && touched.password ? 'ring-red-500 pr-10': 'pr-10'}
              LeftIcons={<Lock size={18} color={errors.regId && touched.regId ? 'red': 'gray'} variant="Outline"/>}
              RightIcon={show ? <Eye onClick={() => setShow(false)} size={20} color="gray" variant="Outline" /> : <EyeSlash size={20} onClick={() => setShow(true)} color="gray" variant="Outline" />}
            />
            <CheckBox name='rememberMe' label='Remember me' />
           <SubmitButton 
              name='Login' 
              type='submit' 
              disabled={isSubmitting} 
              className='bg-black text-white item-center rounded-3xl text-sm w-full h-11'
            />
         </Form>
       )}
     </Formik>
     <div className='flex justify-center items-center md:mb-4 mt-6 xs:mb-2'>
        <span className='sm:text-sm pr-1 xs:text-[12px]'>
          New to NIA Kaduna?
        </span>
        <span className='sm:text-[12px] xs:text-[12px] underline text-gray-800 font-semibold'>
          <Link href={'/auth/register'}>Open an account</Link>
        </span>
     </div>
    </div>
  )
}

export default LoginPage