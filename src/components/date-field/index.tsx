'use client'


import { ErrorMessage, Field } from 'formik'
import React from 'react'

type TextFieldProps = {
    name: string
    className?: string
    showError?: boolean
    label: string
    minDate?: string
}

const DateField: React.FC<TextFieldProps> = ({ name, className, showError, label, minDate}) => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];

    return (
        <div className={`mb-2 text-[14px] ${showError && 'text-red-500'}`}>
           {label && (
                <div className='py-1'>
                    <h3>{label}</h3>
                </div>
           )}
            <Field 
                name={name} 
                type={'date'} 
                //defaultValue={minDate}
                min={todayDate}
                format={'yyyy-mm-dd'}
                className={`${className} rounded-md h-11 border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
            />
            {showError && (
                <ErrorMessage name={name} />
            )}
        </div>
    )
}

export default DateField