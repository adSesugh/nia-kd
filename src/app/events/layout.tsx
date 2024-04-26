import Header from '@/components/header'
import { LayoutProps } from '@/types/common';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Events | NIA-Kd",
    description: "NIA-Kd",
};

const EventLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default EventLayout