import { LayoutProps } from '@/types/common'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Certificates | NIA-Kd",
    description: "NIA-Kd Home",
  };
  

const ResourceLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-full'>{children}</div>
  )
}

export default ResourceLayout