'use client'

import { PRIMARY_ONE } from '@/constant/Colors'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { ArrowLeft } from 'iconsax-react'
import { PaystackButton } from 'react-paystack';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useGetRegistrationFormDetailsLazyQuery, usePostEventRegistrationMutation } from '@/graphql/__generated__/graphql';
import { HookConfig } from 'react-paystack/dist/types';
import { useParams, useRouter } from 'next/navigation';
import { Copy } from '@phosphor-icons/react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useAppSelector } from '@/features/hooks';
import InputField from '@/components/input-field';
import NIAFooter from '@/components/footer';

const Page = () => {
    const { id } = useParams()
    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [trxRef, setTrxRef] = useState<any>()
    const [amount, setAmount] = useState<number>(0)
    const user = useAppSelector((state) => state?.auth.userData.user)
    const [regData, setRegData] = useState<Record<string, any> | undefined>();
    const [event, setEvent] = useState<any>()
    const [getFormDetails] = useGetRegistrationFormDetailsLazyQuery()

    useEffect(() => {
        (async () => {
            const res = (await getFormDetails({
                fetchPolicy: 'no-cache',
                variables: {
                    eventId: id
                }
            })).data
            // find event amount
            const findAmount = res?.getRegistrationForm?.eventPlanPrices?.find((eventPlanPrice) => eventPlanPrice?.membershipTypeId === user?.member?.membershipTypeId)
         
            if(findAmount){
                setAmount(findAmount.charge)
            } else {
                setAmount(res?.getRegistrationForm?.amount)
            }
            setEvent(res?.getRegistrationForm)
        })();

    }, [id])

    useEffect(() => {
        const userData = window.localStorage.getItem('regData')
        if(userData) {
            setRegData(JSON.parse(userData))
        } else {
            const memberData = {
                firstName: user?.member?.firstName,
                lastName: user?.member?.lastName,
                phoneNumber: user?.member?.phoneNumber,
                email: user?.member?.email,
                gender: 'Not specified',
            } 
            setRegData(memberData)
        }
    }, [])

    const [config, setConfig] = useState<HookConfig>(
		{
		  reference: (new Date()).getTime().toString(),
		  amount: amount,
		  email: regData?.email,
		  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
		}
	)

	const [postEventRegistration, {loading}] = usePostEventRegistrationMutation()

	const handlePaystackCloseAction = () => {
		console.log('closed')
	}

	const handlePaystackSuccessAction = async (reference: any) => {
		try {
		  	const res = await postEventRegistration({
			variables: {
				input: {
					memberId: user?.member?.id,
					eventId: id as string,
					registrantDetail: {...regData},
					payment: {
						paymentType: 'event',
						memberId: user?.member?.id,
						eventId: id as string,
						description: event.name as string,
						phoneNumber: regData?.phoneNumber as string,
						paymentRef: reference as string,
						amount: amount,
						status: 'Successful' //reference.status === 'success' ? 'Successful' : 'Unsuccessful',
					}
				}
			}
		  })
		  if(res.data?.postEventRegistration?.id){
			toast.success('Event registered')
			return router.push('/events')
		  }
		} catch (error: any) {
		  	toast.error(error.message)
		}
	};

	const componentProps = {
		...config,
		text: 'I have made the payment',
		onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};
    
    return (
        <div>
            <div className={`justify-center py-7 sm:px-96 xs:px-6 mt-16 w-full bg-[${PRIMARY_ONE}]`}>
                <div>
                    <div className='flex justify-between items-center pt-6 w-full'>
                        <button onClick={() => router.push(`/events/${id}/register`)} className={`flex items-center space-x-2 bg-[${PRIMARY_ONE}]`}>
                            <ArrowLeft variant='Outline' size={20} className='rgb(82 71 75 / 0.7)' />
                            <span className='text-[14px] text-[#52474B]/70'>Back</span>
                        </button>
                    </div>
                </div>
                <div className={`bg-white shadow-sm rounded-3xl my-10 overflow-hidden`}>
                    <div className='flex flex-col justify-center items-center w-full py-6 sm:px-10 xs:px-3'>
                        <h1 className='text-2xl font-medium'>Make Payment</h1>
                        <p className='text-sm text-center text-[#6C6C6C]'>To complete your registration, make a one-time payment to the <br /> following account details.</p>
                    </div>
                    <div className='pt-4 sm:px-10 xs:px-3'>
                        <div>
                            <div className=''>
                                <h1 className='text-sm font-medium'>Steps to make payment</h1>
                                <ol className='list list-decimal pl-4 pt-2'>
                                    <li className='text-sm'>Copy the bank account number.</li>
                                    <li className='text-sm'>Open your bank app and make payment to the bank name specified here.</li>
                                    <li className='text-sm'>Copy your transaction reference.</li>
                                    <li className='text-sm'>Return back to this page and click the “I have made the payment” button.</li>
                                    <li className='text-sm'>System confirms payment and completes your registration.</li>
                                </ol>
                            </div>
                            <div className='sm:px-20 xs:px-3'>
                                <div className='bg-[#F5F5F5] p-6 my-6 rounded-3xl'>
                                    <div className='grid sm:grid-cols-3 xs:grid-cols-1 divide sm:divide-x-2 xs:divide-y-0 gap-4'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <h6 className='text-[#737373]'>Amount</h6>
                                            <h1 className='sm:text-lg xs:text-sm font-semibold'>{'\u20a6'}{Intl.NumberFormat('en-NG').format(Number(amount) || 0)}</h1>
                                        </div>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <h6 className='text-[#737373]'>Bank</h6>
                                            <h1 className='sm:text-lg xs:text-sm font-semibold'>Zenith</h1>
                                        </div>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <h6 className='text-[#737373]'>Account Name</h6>
                                            <h1 className='sm:text-lg xs:text-sm font-semibold text-center'>Nia Kaduna KADAF account</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center pt-12'>
                                        <h1 className='text-[#737373]'>Account Number</h1>
                                        <span className='text-[#161314] font-medium text-3xl'>1312843145</span>
                                    </div>
                                    <div className='flex justify-center mt-3'>
                                        <CopyToClipboard text="1312843145" onCopy={() => toast.success('1312843145 copied')}>
                                            <div className='flex justify-center bg-white rounded-full px-4 h-10 items-center space-x-3 cursor-pointer'>
                                                <span className='text-[#29AA26]'>Copy</span>
                                                <Copy size={24} color='#29AA26' />
                                            </div>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className='px-8 pb-5'>
                                    <div className='flex justify-center items-center space-x-3 pt-2 pb-4'>
                                        <button 
                                            className='bg-[#35AB56] text-white item-center rounded-xl w-full h-12'
                                            onClick={onOpen}
                                        >
                                            <span>I have made the payment</span>
                                        </button>
                                        {/* <Button 
                                            name='Register' 
                                            type='submit' 
                                            onMouseEnter={() => {
                                                const totalAmount = amount * 100
                                                setConfig({...config, email: regData?.email as string, amount: totalAmount})
                                            }}
                                            onClick={() => {
                                                const totalAmount = amount * 100
                                                setConfig({...config, email: regData?.email as string, amount: totalAmount})
                                            }}
                                            className='bg-[#35AB56] text-white item-center rounded-xl w-full h-12'
                                            as={'div'}
                                            disabled={regData?.email as string !== undefined ? false : true}
                                        >
                                            <PaystackButton 
                                                amount={amount* 100} 
                                                email={regData?.email as string} 
                                                reference={(new Date()).getTime().toString()}
                                                {...componentProps} 
                                            />
                                        </Button> */}
                                    </div>
                                </div>
                                <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} isDismissable={false}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1 items-center">Payment Confirmation</ModalHeader>
                                                <ModalBody>
                                                    <p className='text-center text-sm'> 
                                                        Please provide us your payment reference for verification.
                                                    </p>
                                                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4 py-4">
                                                        <InputField 
                                                            name='txtRef'
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTrxRef(e.target.value)}
                                                            value={trxRef}
                                                            placeholder='Payment Reference'
                                                            className='flex w-full h-12'
                                                            label='Payment Reference'
                                                        />
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button 
                                                        variant="bordered" 
                                                        onPress={onClose}
                                                        className='bg-[#e9edea] text-black item-center rounded-xl w-24 h-12'
                                                    >
                                                        Close
                                                    </Button>
                                                    <Button 
                                                        as={'button'}
                                                        className='bg-[#35AB56] z-0 text-white item-center rounded-xl w-32 h-12'
                                                        isLoading={loading}
                                                        disabled={trxRef !== undefined ? false : true}
                                                        onClick={() => {handlePaystackSuccessAction(trxRef)}}
                                                    >
                                                        Continue
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NIAFooter />
        </div>
    )
}

export default Page