import { ErrorMessage, Field } from 'formik'
import React from 'react'
import Image from 'next/image'

type TextFieldWithIconProps = {
    name: string
    placeholder: string
    type?: string
    RightIcon?: React.ReactNode
    LeftIcons?: React.ReactNode
    className?: string
}

const TextFieldWithIcon: React.FC<TextFieldWithIconProps> = ({ name, placeholder, type, LeftIcons, RightIcon, className}) => {
    return (
        <div>
            <div className="relative mt-2 rounded-md shadow-sm">
                {LeftIcons && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        {LeftIcons}
                    </div>
                )}
                <Field 
                    type={type} 
                    name={name} 
                    className={`${className} block w-full rounded-md h-11 border-0 py-1.5 ${LeftIcons ? 'pl-9' : 'pl-3'} ${RightIcon ? 'pr-10' : 'pr-3'} text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`} 
                    placeholder={placeholder} 
                />
                {RightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {RightIcon}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TextFieldWithIcon