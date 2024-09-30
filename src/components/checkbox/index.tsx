import { ErrorMessage, Field } from 'formik'
import React from 'react'

type CheckboxProps = {
    name: string
    label: string
    defaultChecked?: boolean
}

const CheckBox: React.FC<CheckboxProps> = ({name, label, defaultChecked}) => {
    return (
        <div className="form-control pt-1 sm:w-full xs:w-36">
            <label className="flex label cursor-pointer text-left items-center w-full">
                <Field 
                    type="checkbox" 
                    name={name} 
                    className="checkbox checkbox-sm" 
                    defaultChecked={defaultChecked}
                />
                <span className="label-text ml-2 w-full text-sm">{label}</span> 
            </label>
            <ErrorMessage name={name} />
        </div>
    )
}

export default CheckBox