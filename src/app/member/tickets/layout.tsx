import { LayoutProps } from '@/types/common'
import React from 'react'

const TicketLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-full w-full sm:px-12 xs:px-6 pb-16 overflow-y-auto'>
        {children}
    </div>
  )
}

export default TicketLayout