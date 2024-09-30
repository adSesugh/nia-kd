'use client'

import React, { useEffect } from 'react'
import styles from '@/styles/auth.module.css'
import { Form, Formik, FormikHelpers,  } from 'formik'
import * as Yup from 'yup'
import { ForgotPasswordForm } from '@/types/auth';
import Link from 'next/link'
import TextFieldWithIcon from '@/components/textfield-withicon'
import SubmitButton from '@/components/submit-button'
import { useRouter } from 'next/navigation'
import { useSendForgotPasswordResetCodeMutation } from '@/graphql/__generated__/graphql'
import { toast } from 'react-toastify'
import { Role } from '@/lib/common'
import { useAppSelector } from '@/features/hooks'
import { RootState } from '@/features/store'
import { Envelope } from '@phosphor-icons/react'

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required()
});

const Page = () => {
  const initialValues: ForgotPasswordForm = { email: '' };
  const [sendResetForgotPasswordCode, {loading, error}] = useSendForgotPasswordResetCodeMutation({fetchPolicy: 'no-cache'})
  const isLoggedIn = useAppSelector((state:RootState) => state.auth.userData?.token)
  const user = useAppSelector((state:RootState) => state.auth.userData?.user)
  const router = useRouter()

  useEffect(() => {
    document.title = 'Forgot Password | NIA-Kd'
    if(isLoggedIn && user?.role === Role.MEMBER) {
      return router.push('/member/dashboard')
    } else if (isLoggedIn && user?.role === Role.ADMINISTRATOR){
      return router.push('/dashboard')
    }
  }, [isLoggedIn, router, user])


  return (
    <div className={`${styles.login}`}>
      <h1>Forgot password</h1>
      <h2>Enter email address to send forgord password</h2>
     <Formik
       initialValues={initialValues}
       validationSchema={ForgotPasswordSchema}
       onSubmit={async (values: ForgotPasswordForm, { setSubmitting }: FormikHelpers<ForgotPasswordForm>) => {
        console.log(values)
        try {
          const res = await sendResetForgotPasswordCode({
            variables: {
              email: values.email
            }
          })

          if(res.data?.sendForgotPasswordCode?.success) {
            toast.success(res.data.sendForgotPasswordCode.message)
            setSubmitting(false)
            return router.push('/auth/reset-password')
          }
        } catch (error: any) {
          setSubmitting(false)
          toast.error(error.message)
          return error.message
        }
       }}
     >
       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
         <Form onSubmit={handleSubmit} className='space-y-5'>
           <TextFieldWithIcon 
              name='email' 
              placeholder='Email Address' 
              type='text' 
              LeftIcons={<Envelope size={20} color={errors.email && touched.email ? 'red': 'gray'} />}
              className={errors.email && touched.email ? 'ring-red-500': 'pr-3'}
            />
           <SubmitButton 
              name={isSubmitting || loading ? 'Please wait...' : 'Send reset password'} 
              type='submit' 
              disabled={isSubmitting || loading } 
              className='bg-black text-white item-center rounded-3xl text-sm w-full h-11'
            />
         </Form>
       )}
     </Formik>
     <div className='flex justify-center items-center md:mb-4 mt-6 xs:mb-2'>
        <span className='sm:text-sm pr-1 xs:text-[12px]'>
          Go back?
        </span>
        <span className='sm:text-[12px] xs:text-[12px] underline text-gray-800 font-semibold'>
          <Link href={'/auth/login'}>Login</Link>
        </span>
     </div>
    </div>
  )
}

export default Page