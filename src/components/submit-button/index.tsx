import React from 'react'

type ButtonProps = {
    name: string
    type: 'submit' | 'reset'
    disabled?: boolean
    className: string
}

const SubmitButton: React.FC<ButtonProps> = ({name, type, disabled, className}) => {
  return (
    <div className='my-4'>
        <button 
            type={type} 
            className={className}
            disabled={disabled}
        >
            {name}
        </button>
    </div>
  )
}

export default SubmitButton