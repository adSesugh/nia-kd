'use client'

import { Field } from 'formik'
import React, { Fragment } from 'react'

type SelectFilterProps = {
    name: string
    className?: string
    data: any,
    nullValue?: string
}

const SelectFilter: React.FC<SelectFilterProps> = ({name, className, data, nullValue}) => {
    return (
        <Field 
            as="select" 
            name={name}
            className={`${className} block rounded-md h-11 border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
        >
            {nullValue && <option value={''}>{nullValue}</option>}
            {data.map((opt: any, index: number) => (
                <option key={index} value={opt.id}>{opt.name}</option>
            ))}
        </Field>
    )
}

export default SelectFilter