'use client'

import React, { useEffect } from 'react'
import styles from '@/styles/auth.module.css'
import { Form, Formik, FormikHelpers,  } from 'formik'
import * as Yup from 'yup'
import { ResetPasswordForm } from '@/types/auth';
import Link from 'next/link'
import { EyeSlash, Eye } from 'iconsax-react'
import TextFieldWithIcon from '@/components/textfield-withicon'
import SubmitButton from '@/components/submit-button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCodeConfirmationMutation, useResetPasswordMutation } from '@/graphql/__generated__/graphql'
import { toast } from 'react-toastify'
import { Role } from '@/lib/common'
import { useAppDispatch, useAppSelector } from '@/features/hooks'
import { RootState } from '@/features/store'
import { Envelope } from '@phosphor-icons/react'
import TextField from '@/components/textfield'

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    code: Yup.number().required(),
    password: Yup.string().required('Password is required').min(6, 'Password must be 6 or more characters long'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Password must match'),
});

const Page = () => {
  const [show, setShow] = React.useState<boolean>(false)
  const [confirmCode, {loading: confirmLoading}] = useCodeConfirmationMutation({fetchPolicy: 'no-cache'})
  const [resetPassword, {loading, error}] = useResetPasswordMutation({fetchPolicy: 'no-cache'})
  const isLoggedIn = useAppSelector((state:RootState) => state.auth.userData?.token)
  const user = useAppSelector((state:RootState) => state.auth.userData?.user)
  const router = useRouter()
  const params = useSearchParams()

  const initialValues: ResetPasswordForm = { code: '', email: params.get('email') as string, password: '', confirm_password: '' };

  useEffect(() => {
    document.title = 'Reset Password | NIA-Kd'
    if(isLoggedIn && user?.role === Role.MEMBER) {
      return router.push('/member/dashboard')
    } else if (isLoggedIn && user?.role === Role.ADMINISTRATOR){
      return router.push('/dashboard')
    }
  }, [isLoggedIn, router, user])


  return (
    <div className={`${styles.login}`}>
      <h1>Reset password</h1>
      <h2>Enter to fields below to complete password reset</h2>
     <Formik
       initialValues={initialValues}
       validationSchema={ResetPasswordSchema}
       onSubmit={async (values: ResetPasswordForm, { setSubmitting }: FormikHelpers<ResetPasswordForm>) => {
        try {
            const confirmRes = (await confirmCode({
                variables: {
                    code: values.code
                }
            })).data

            if(confirmRes?.codeConfirmation?.success) {
                const reset = await resetPassword({
                    variables: {
                        userId: confirmRes.codeConfirmation.userId,
                        password: values.password
                    }
                })

                if(reset.data?.resetPassword?.success) {
                    toast.success(reset.data.resetPassword.message)
                    setSubmitting(false)
                    return router.push('/auth/login')
                }   
            } else {
                toast.error(confirmRes?.codeConfirmation?.message)
            }
        } catch (error: any) {
          //setSubmitting(false)
          toast.error(error.message)
          return error.message
        }
       }}
     >
       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
         <Form onSubmit={handleSubmit} className='space-y-5'>
            <TextField
              name='code' 
              placeholder='Verification code' 
              type={'number'} 
              showError={true}
              className={errors.code && touched.code ? 'ring-red-500 pr-10 mt-4': 'pr-10 mt-4'}
            />
           <TextFieldWithIcon 
              name='email' 
              placeholder='Email Address' 
              type='text' 
              defaultValue={values.email?.toString()}
              readOnly={true}
              LeftIcons={<Envelope size={20} color={errors.email && touched.email ? 'red': 'gray'} />}
              className={errors.email && touched.email ? 'ring-red-500': 'pr-3'}
            />
            <TextFieldWithIcon 
              name='password' 
              placeholder='Password' 
              type={show ? 'text' : 'password'} 
              className={errors.password && touched.password ? 'ring-red-500': ''}
              RightIcon={show ? <Eye onClick={() => setShow(false)} size={20} color="gray" variant="Outline" /> : <EyeSlash size={20} onClick={() => setShow(true)} color="gray" variant="Outline" />}
            />
            <TextField
              name='confirm_password' 
              placeholder='Confirm password' 
              type={show ? 'text' : 'password'} 
              showError={true}
              className={errors.confirm_password && touched.confirm_password ? 'ring-red-500 pr-10 mt-4': 'pr-10 mt-4'}
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
          Go back
        </span>
        <span className='sm:text-[12px] xs:text-[12px] underline text-gray-800 font-semibold'>
          <Link href={'/auth/login'}>Login</Link>
        </span>
     </div>
    </div>
  )
}

export default Page