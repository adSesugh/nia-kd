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
    onChange: (event: any) => void
}

const InputTextArea: React.FC<TextFieldProps> = ({ name, placeholder, type, className, showError, label, disabled, ...rest}) => {
  return (
    <div className={`mb-2 text-[14px] ${showError && 'text-red-500'}`}>
      {label && (
        <div className='py-1'>
            <h3>{label}</h3>
        </div>
      )}
      <textarea 
        name={name} 
        placeholder={placeholder} 
        disabled={disabled}
        onChange={rest.onChange}
        value={rest.value}
        rows={4}
        className={`${className} block w-full rounded-md border-0 focus:border focus:border-gray-400 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
      />
    </div>
  )
}

export default InputTextArea