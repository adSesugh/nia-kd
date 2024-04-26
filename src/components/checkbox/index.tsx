import { ErrorMessage, Field } from 'formik'
import React from 'react'

type CheckboxProps = {
    name: string
    label: string
    defaultChecked?: boolean
}

const CheckBox: React.FC<CheckboxProps> = ({name, label, defaultChecked}) => {
    return (
        <div className="form-control pt-1 w-1/3 md:w-36 xs:w-36">
            <label className="label cursor-pointer text-left">
                <Field 
                    type="checkbox" 
                    name={name} 
                    className="checkbox checkbox-sm w-1" 
                    defaultChecked={defaultChecked}
                />
                <span className="label-text ml-2">{label}</span> 
            </label>
            <ErrorMessage name={name} />
        </div>
    )
}

export default CheckBox