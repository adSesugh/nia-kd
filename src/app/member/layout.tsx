'use client'

import Header from '@/components/member/Header'
import { useAppSelector } from '@/features/hooks'
import { RootState } from '@/features/store'
import { LayoutProps } from '@/types/common'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const MemberLayout: React.FC<LayoutProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state: RootState) => state.auth.userData.token)

  if(!isLoggedIn){
    return redirect('/auth/login')
  }
  
  return (
    <div className='flex flex-col h-screen w-full'>
        <Header />
        <div className='w-full h-[90%] overflow-hidden'>
          <div className='h-full w-full overflow-y-auto'>
            {children}
          </div>
        </div>
    </div>
  )
}

export default MemberLayout