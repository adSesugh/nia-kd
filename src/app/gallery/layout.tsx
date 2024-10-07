import NIAFooter from '@/components/footer';
import Header from '@/components/header'
import { LayoutProps } from '@/types/common';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Gallery | NIA-Kd",
    description: "NIA-Kd",
};  

const GalleryLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <Header />
        {children}
        <NIAFooter />
    </div>
  )
}

export default GalleryLayout