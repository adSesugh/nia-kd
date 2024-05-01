import Footer from '@/components/member/Footer'
import Header from '@/components/member/Header'
import { LayoutProps } from '@/types/common'
import React from 'react'

const MemberLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen w-full'>
        <Header />
        <div className='w-full h-[90%] overflow-hidden'>
          <div className='flex flex-col justify-between h-full w-full overflow-y-scroll'>
            {children}
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default MemberLayout