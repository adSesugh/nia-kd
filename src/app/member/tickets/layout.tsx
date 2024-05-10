import { LayoutProps } from '@/types/common'
import React from 'react'

const TicketLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-full w-full sm:px-80 xs:px-6'>
        {children}
    </div>
  )
}

export default TicketLayout