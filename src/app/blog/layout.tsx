import Header from '@/components/header'
import { LayoutProps } from '@/types/common';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Blog | NIA-Kd",
    description: "NIA-Kd",
};  

const BlogLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default BlogLayout