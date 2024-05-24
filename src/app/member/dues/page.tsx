'use client'

import { useAppSelector } from '@/features/hooks';
import { RootState } from '@/features/store';
import { useGetDuePaymentQuery, useMemberPaymentsLazyQuery } from '@/graphql/__generated__/graphql';
import { getDaysPercentage, getTotalDaysInYear, getTotalDaysOfYear } from '@/lib/helpers';
import { CircularProgress } from '@nextui-org/react';
import { Clock, Timer, Timer1 } from 'iconsax-react';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

// export const metadata: Metadata = {
//   title: "Annual Dues Payments | NIA-Kd",
//   description: "NIA-Kd Home",
// };

const DueScreen = () => {
  const [duePayments, setDuePayments] = useState<any>([])
  const memberId: string = useAppSelector((state: RootState) => state.auth.userData.user?.member?.id)

  const [getMemberPayments, {loading, error}] = useMemberPaymentsLazyQuery({fetchPolicy: "no-cache"})
  const {data: dueToPay, loading: dueToPayLoader} = useGetDuePaymentQuery({
    variables: {
      memberId
    }
  })

  const getPercent = getDaysPercentage( getTotalDaysOfYear(new Date()), getTotalDaysInYear(new Date().getFullYear()))

  useEffect(() => {
    document.title = 'Annual Dues Payments | NIA-Kd'
    ;(async () => {
      const res = await getMemberPayments({
        variables: {
          memberId
        }
      })

      setDuePayments(res.data?.memberPayments)
    })()
  }, [getMemberPayments, memberId])

  return (
    <div className='h-full w-full sm:px-80 xs:px-6 bg-gray-100 pb-5 pt-16'>
      <div className='flex xs:flex-col sm:flex-row gap-5 justify-between'>
        <div className='flex xs:flex-col sm:flex-row sm:space-x-4 xs:space-x-0 border bg-white px-9 py-4 rounded-2xl items-center w-full'>
          <div className='flex justify-center items-center h-full xs:pb-4 sm:pb-0 -ml-2'>
            <CircularProgress
              value={getPercent}
              showValueLabel={true} 
              strokeWidth={4}
              classNames={{
                svg: "w-24 h-24 drop-shadow-md",
                indicator: `${getPercent >= 80 ? "stroke-danger" : "stroke-success" }`,
                track: "#BFBFBF",
                value: "text-sm font-semibold text-[#1E1A1C]",
              }}
            />
          </div>
          <div className='flex h-full flex-col gap-4 pb-3'>
            <div>
              <h1 className='text-xl'>Membership Due</h1>
              <span className='text-[13px] text-gray-500'>You have {getTotalDaysInYear(new Date().getFullYear()) - getTotalDaysOfYear(new Date())} days left to renew your membership due</span>
            </div>
            <div className='flex space-x-5 items-center'>
              {dueToPay?.getDuePayment?.status === 'Active' && !dueToPay.getDuePayment.paymentStatus ? (
                <button disabled={dueToPayLoader || dueToPay?.getDuePayment.status !== 'Active' ? true : false} className='px-3 py-1.5 rounded-full text-sm text-white bg-[#241F21]'>Pay now</button>
              ) : (
                <button disabled={true} className='px-3 py-1.5 rounded-full text-sm text-white bg-[#241F21]'>Paid</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='pt-8 w-full'>
        <h1 className='text-lg font-semibold'>Payment History</h1>
        <div className='flex flex-col items-center justify-center w-full pt-20'>
          <Image
            className=''
            alt='no-search-found'
            src={'/assets/search.svg'}
            width={100}
            height={100}
            sizes='60vw'
            style={{
              width: '10%',
              height: 'auto'
            }} 
          />
          <span>No dues found</span>
        </div>
      </div>
    </div>
  )
}

export default DueScreen