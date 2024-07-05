'use client'

import {ArrowLeft, Camera} from "@phosphor-icons/react";
import {useSelector} from "react-redux";
import {RootState} from "@/features/store";
import {Role} from "@/lib/common";
import { useEffect, useState } from "react";
import { Copy } from "iconsax-react";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import TextField from "../textfield";
import { PasswordSchema } from "@/lib/validations";
import { Member, useProfilephotoUploadMutation, useResetPasswordMutation } from "@/graphql/__generated__/graphql";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/features/hooks";
import { Spinner } from "@nextui-org/react";

type ProfilePropType = {
    data: any,
    loading: boolean
}

const ProfileScreen: React.FC<ProfilePropType> = ({ data, loading }) => {
    
    const router = useRouter()
    const user = useSelector((state: RootState) => state?.auth.userData.user)
    const [speakerImg, setSpeakerImg] = useState<string>()
    const [resetPassword, {loading: resetPasswordLoading}] = useResetPasswordMutation()
    const [profilePhotoUpload, {loading: profileLoading}] = useProfilephotoUploadMutation()

    if(loading){
        return (
            <div className="flex h-screen justify-center items-center">
                <Spinner size="lg"  color="default" />
            </div>
        )
    }

    console.log(data)

    return (
        <div className={'flex sm:px-40 xs:px-6 justify-center'}>
            <div className={'w-full'}>
                <div className={'flex items-center space-x-3 pt-10 cursor-pointer'} onClick={() => user?.role === Role.ADMINISTRATOR ? router.back() : router.push('/member/dashboard')}>
                    <ArrowLeft size={20} color="gray" />
                    <h1>Back to {user?.role === Role.ADMINISTRATOR ? 'members' : 'previous page'} </h1>
                </div>
                <div className="pt-8 pb-4">
                    <h1 className="text-lg font-semibold">Profile</h1>
                </div>
                <div className="flex sm:flex-row xs:flex-col sm:gap-6 xs:gap-0 xs:space-y-4">
                    <div className="sm:w-2/5 xs:w-full">
                        <div className="w-full">
                            <div className="flex justify-center items-center bg-white rounded-lg shadow-sm w-full border">
                                <div>
                                    <div className="flex flex-col justify-center items-center text-center mb-4 rounded-lg py-10">
                                        <input
                                            type="file"
                                            id="profilePix"
                                            name='avatar'
                                            className="hidden"
                                            multiple
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                if (event.target.files) {
                                                    const file = event.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = async () => {
                                                            setSpeakerImg(reader.result as string)
                                                            try {
                                                                const photoUrl = (await profilePhotoUpload({
                                                                    variables: {
                                                                        memberId: data?.id,
                                                                        photo: reader.result as string
                                                                    }
                                                                })).data?.profilephotoUpload?.url
                                                                
                                                                if(photoUrl) {
                                                                    const newUrl = {
                                                                        photoURL: photoUrl
                                                                    }
                                                                    toast.success('Profile photo uploaded')
                                                                }
                                                            } catch (error: any) {
                                                                console.log(error)
                                                            }
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }
                                            }}
                                        />
                                        <label aria-label='speakerPix' htmlFor="profilePix" className="flex flex-col items-center rounded-full cursor-pointer h-28 w-28">
                                            {speakerImg || user?.photoURL ? (
                                                <div className="flex relative items-center justify-center h-24 w-24">
                                                    <img src={user?.photoURL || speakerImg} className='rounded-full h-24 w-24' />
                                                    <div className="absolute p-1 rounded-full bg-[#eae1df] bottom-3 -right-1">
                                                        <Camera size={16} />
                                                    </div>
                                                </div>
                                            ): (
                                                <div className="flex relative items-center justify-center h-24 w-24">
                                                    <img src={'/assets/profile2.svg'} className='rounded-full h-24 w-24' />
                                                    <div className="absolute p-1 rounded-full bg-[#eae1df] bottom-3 -right-1">
                                                        <Camera size={16} />
                                                    </div>
                                                </div>
                                            )}
                                        </label>
                                        <div className="space-y-1">
                                            <h1 className="font-semibold">{data?.lastName} {data?.firstName}</h1>
                                            <div className="flex space-x-2 items-center cursor-pointer">
                                                <h3 className="text-sm">{data?.email}</h3>
                                                <CopyToClipboard text="abdulrazaq290.aj@gmail.com" onCopy={() => toast.success('Copy!')}>
                                                    <Copy variant="Outline" size={16} />
                                                </CopyToClipboard>
                                            </div>
                                            <h4>{data?.workplace}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-3/5 xs:w-full">
                        <div className="w-full space-y-4">
                            <div className="bg-white rounded-lg shadow-sm w-full border">
                                <div className="flex items-center py-3 px-4">
                                    <h1 className="font-semibold">Basic Info</h1>
                                </div>
                                <hr />
                                <div className="px-4 py-3">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>First name:</td>
                                                <td className='text-sm'>{data?.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>Last name:</td>
                                                <td className='text-sm'>{data?.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>Membership Type:</td>
                                                <td className='text-sm'>{data?.membershipType?.name}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>Membership ID:</td>
                                                <td className='text-sm'>{data?.membershipId || 'Not set'}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>Phone:</td>
                                                <td className='text-sm'>{data?.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>Workplace:</td>
                                                <td className='text-sm'>{data?.workplace}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-sm w-1/3 py-2'>Email:</td>
                                                <td className='text-sm'>{data?.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm w-full border">
                                <div className="flex items-center py-3 px-4">
                                    <h1 className="font-semibold">Password</h1>
                                </div>
                                <hr />
                                <div className="px-4">
                                    <Formik 
                                        initialValues={{ password: ''}}
                                        validationSchema={PasswordSchema}
                                        onSubmit={async(values, {setFieldValue}) => {
                                            try {
                                                const res = await resetPassword({
                                                    variables: {
                                                        userId: user?.id,
                                                        password: values.password
                                                    }
                                                })
                                                if(res.data?.resetPassword?.success){
                                                    setFieldValue('password', '')
                                                    toast.success(res.data.resetPassword.message)
                                                }
                                            } catch (error: any) {
                                                toast.error(error.message)
                                            }
                                        }}
                                    >
                                        {({handleSubmit, touched, errors}) => (
                                            <Form onSubmit={handleSubmit}>
                                                <div className="flex py-3 items-center space-x-2">
                                                    <TextField 
                                                        label="Password"
                                                        name="password"
                                                        required={true}
                                                        placeholder='New password'
                                                        type="password"
                                                        className={`${errors.password && touched.password ? 'ring-red-500': ''} h-9`}
                                                    />
                                                    <div className="pt-5">
                                                        <button 
                                                            type="submit" 
                                                            className="flex py-2 px-4 justify-center items-center h-9 border rounded-lg text-sm"
                                                            disabled={resetPasswordLoading}
                                                        >
                                                            {resetPasswordLoading ? 'Please wait...' : 'Change password'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen