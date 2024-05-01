import { LayoutProps } from '@/types/common'
import React from 'react'

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

export default DashboardLayout