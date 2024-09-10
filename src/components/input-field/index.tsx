import React, { ChangeEvent } from 'react'

type TextFieldProps = {
    name: string
    placeholder?: string
    type?: string
    className?: string
    showError?: boolean
    label?: string,
    disabled?: boolean
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<TextFieldProps> = ({ name, placeholder, type, className, showError, label, disabled, ...rest}) => {
  return (
    <div className={`mb-2 text-[14px] ${showError && 'text-red-500'} w-full`}>
      {label && (
        <div className='py-1'>
            <h3>{label}</h3>
        </div>
      )}
      <input 
        name={name} 
        placeholder={placeholder} 
        type={type} 
        disabled={disabled}
        {...rest}
        className={`${className} block w-full rounded-md h-11 border-0 focus:border focus:border-gray-400 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
      />
    </div>
  )
}

export default InputField