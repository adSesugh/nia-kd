import { LayoutProps } from '@/types/common'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

const NextProvider: React.FC<LayoutProps> = ({ children }) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}

export default NextProvider