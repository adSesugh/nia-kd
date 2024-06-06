import NIAFooter from '@/components/footer';
import Header from '@/components/header';
import { LayoutProps } from '@/types/common';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Contact | NIA-Kd",
    description: "NIA-Kd",
};

const ContactLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <Header />
        {children}
        <NIAFooter />
    </div>
  )
}

export default ContactLayout