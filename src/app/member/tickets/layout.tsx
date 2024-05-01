import { LayoutProps } from '@/types/common'
import React from 'react'

const TicketLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-full w-full px-80'>
        {children}
    </div>
  )
}

export default TicketLayout