'use client'

import { ErrorMessage, Field } from 'formik'
import { SearchNormal1 } from 'iconsax-react'
import React from 'react'

type SearchbarProps = {
    name: string
    placeholder?: string
    type?: string
    className?: string
    showError?: boolean
}

const SearhbarWithIcon: React.FC<SearchbarProps> = ({name, placeholder, type, className, showError}) => {
    return (
        <div className={`relative text-[14px] ${showError && 'text-red-500'}`}>
            <div className='absolute top-3 left-3'>
                <SearchNormal1 size="20" color="#1F0E1C" />
            </div>
            <Field 
                name={name} 
                placeholder={placeholder} 
                type={type} 
                className={`${className} block rounded-md h-11 border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
            />
            {showError && (
                <ErrorMessage name={name} />
            )}
        </div>
    )
}

export default SearhbarWithIcon