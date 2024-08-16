'use client'

import { LayoutProps } from '@/types/common'
import React, { useEffect } from 'react'
import { ApolloWrapper } from "@/providers/apollo-wrapper";
import NextProvider from "@/providers/NextProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/swiper-bundle.css"; 
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const AppWrapper: React.FC<LayoutProps> = ({ children }) => {
    useEffect(() => {
        const handleContextmenu = (e: { preventDefault: () => void; }) => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])
    return (
        <div className='select-none'>
            <ApolloWrapper>
                <NextProvider>
                    <ReduxProvider>
                        {children}
                        <ToastContainer />
                    </ReduxProvider>
                </NextProvider>
            </ApolloWrapper>
        </div>
    )
}

export default AppWrapper