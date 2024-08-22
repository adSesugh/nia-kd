
"use client";

import { FileInput, Label } from "flowbite-react";
import { ErrorMessage, Field, useField } from "formik";
import React, { forwardRef } from "react";

type FileInputProps = {
    name: string
    placeholder?: string
    type?: string
    className?: string
    showError?: boolean
    label?: string
    subtitle?: string
    base64?: string
    id: string
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const NIAFileInput: React.FC<FileInputProps> = (props, ref) => {
    const { name, label, subtitle, showError, base64, handleFileChange, className, id} = props
     return (
        <div className={`mb-2 text-[14px] ${showError && 'text-red-500'} border-t`}>
            {label && (
                <div className='flex flex-col justify-center py-3 w-full bg-white'>
                    <h3 className="font-semibold">{label}</h3>
                    <span className="text-[#5D5D5D] text-[13px]">{subtitle}</span>
                </div>
            )}
            <div className="flex w-full items-center justify-center">
                <Label
                    htmlFor={id}
                    className={`flex h-64 ${className} w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                >
                    {base64 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={base64} alt="uploaded" className="flex h-full w-full" />
                    ): (
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                    )}
                    <FileInput
                        name={name}
                        id={id}
                        className="hidden"
                        accept="image/.gif,.png,.jpeg,.jpg"
                        onChange={handleFileChange} 
                    />
                </Label>
            </div>
            <div className="mt-2">
                {showError && (
                    <ErrorMessage name={name} />
                )}
            </div>
        </div>
    );
}

export default NIAFileInput