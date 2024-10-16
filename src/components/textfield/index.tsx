'use client'

import { ErrorMessage, Field } from 'formik'
import React from 'react'

type TextFieldProps = {
    name: string
    placeholder?: string
    type?: string
    className?: string
    showError?: boolean
    label?: string,
    disabled?: boolean
    min?: number
    required?: boolean
}

const TextField: React.FC<TextFieldProps> = ({ name, placeholder, type, className, showError, label, disabled, min=0, required, ...rest}) => {
  return (
    <div className={`mb-2 text-[14px] ${showError && 'text-red-500'}`}>
      {label && (
        <div className='py-1'>
            <h3>{label}</h3>
        </div>
      )}
      <Field 
        name={name} 
        placeholder={placeholder} 
        type={type} 
        disabled={disabled}
        min={min}
        required={required}
        {...rest}
        className={`${className} block w-full rounded-md h-11 border-0 ${showError ? 'border-red-500' : ''} focus:border focus:border-gray-400 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
      />
      {showError && (
        <ErrorMessage name={name} />
      )}
    </div>
  )
}

export default TextField