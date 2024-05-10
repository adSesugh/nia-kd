import Header from '@/components/member/Header'
import { LayoutProps } from '@/types/common'
import React from 'react'

const MemberLayout: React.FC<LayoutProps> = ({ children }) => {
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