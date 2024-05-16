'use client'

import React, { useEffect } from 'react'
import SubmitButton from '@/components/submit-button';
import TextField from '@/components/textfield';
import TextFieldWithIcon from '@/components/textfield-withicon';
import { MemberForm } from '@/types/auth';
import { Formik, FormikHelpers, Form } from 'formik';
import { Eye, EyeSlash, Link, Lock } from 'iconsax-react';
import * as Yup from 'yup'
import styles from '@/styles/auth.module.css'

const MemberSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    regId: Yup.string().required('Membership ID is required'),
    address: Yup.string().required('Resident Address is required'),
    memberType: Yup.string().nullable(),
    password: Yup.string().required('Password is required').min(6, 'Password must be 6 or more characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must match')
});

const AddMemberPage = () => {
    const initialValues: MemberForm = { 
        firstName: '', 
        lastName: '',
        email: '',
        phoneNumber: '', 
        regId: '', 
        address: '',
        password: '',
        memberType: '',
        confirmPassword: '' 
    };
    const [show, setShow] = React.useState<boolean>(false)
    const [files, setFiles] = React.useState<File>()
    const [image, setImage] = React.useState<string>()
    //const [createMember] = useCreateMemberMutation()

    console.log(files)
    useEffect(() => {}, [image])

    return (
        <div className={styles.register}>
            <h1>Sign Up</h1>
            <h2>Get started by filling the registration form below</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={MemberSchema}
                onSubmit={(values: MemberForm, { setSubmitting }: FormikHelpers<MemberForm>) => {
                    delete values.confirmPassword
                    const formData = new FormData()
                    //formData.append('photoURL', files)
                    formData.append('firstName', values.firstName)
                    formData.append('lastName', values.lastName)
                    formData.append('email', values.email)
                    formData.append('phoneNumber', values.phoneNumber)
                    formData.append('password', values.password)
                    formData.append('address', values.address)
                    formData.append('regId', values.regId)

                    let imageURL

                    console.log(files)

                    const reader = new FileReader();
                    // reader.readAsArrayBuffer(files)
                    // reader.onload = (e) => {
                    //     const dataURL = `data:${files?.type};base64,${btoa(reader.result)}`;
                    //     console.log("dataURL: ", dataURL);
                    //     imageURL = dataURL
                    //     setImage(dataURL);
                    // };

                    // const data = {
                    //     ...values,
                    //     photoURL: files
                    // }
                    // console.log(values.photoURL);
                    // //setSubmitting(false)
                    // createMember({
                    //     variables: {
                    //         input: data
                    //     }
                    // })
                }}
            >
                {({ values, errors, touched, isSubmitting, }) => (
                <Form encType='multipart/form-data'>
                    <TextField
                    name='firstName'
                    placeholder='First name' 
                    className={errors.firstName && touched.firstName ? 'ring-red-500 pr-10': 'pr-10'}
                    />
                    <TextField
                    name='lastName'
                    placeholder='Last name' 
                    className={errors.lastName && touched.lastName ? 'ring-red-500 pr-10': 'pr-10'}
                    />
                    <TextField
                    name='email'
                    placeholder='Email Address' 
                    className={errors.email && touched.email ? 'ring-red-500 pr-10': 'pr-10'}
                    />
                    <TextField
                    name='phoneNumber'
                    placeholder='Phone number' 
                    className={errors.phoneNumber && touched.phoneNumber ? 'ring-red-500 pr-10': 'pr-10'}
                    />
                    <TextField
                    name='regId'
                    placeholder='NIA membership ID' 
                    className={errors.regId && touched.regId ? 'ring-red-500 pr-10': 'pr-10'}
                    />
                    <TextField
                    name='address'
                    placeholder='Resident Address'
                    className={errors.address && touched.address ? 'ring-red-500 pr-10': 'pr-10'} 
                    />
                    <div className='my-3'>
                        <input 
                            //onChange={(e) => setFiles(e.target.files[0])}
                            className='pr-10 file-input file-input-bordered w-full max-w-xs'
                            type='file'
                        />
                    </div>
                    <TextField
                    name='memberType'
                    placeholder='Member Type'
                    className={errors.memberType && touched.memberType ? 'ring-red-500 pr-10': 'pr-10'} 
                    />
                    <TextFieldWithIcon 
                    name='password' 
                    placeholder='Password' 
                    type={show ? 'text' : 'password'} 
                    className={errors.password && touched.password ? 'ring-red-500 pr-10': 'pr-10'}
                    LeftIcons={<Lock size={18} color={errors.password && touched.password ? 'red': 'gray'} variant="Outline"/>}
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
                        name='Register'
                        type='submit' 
                        //disabled={isSubmitting} 
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

export default AddMemberPage