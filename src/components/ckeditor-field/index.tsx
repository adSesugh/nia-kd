'use client'

import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useField, useFormikContext } from 'formik';

interface CKeditorFieldProps {
    name: string
    label?: string
    showError?: boolean
    helpText?: string
    subtitle?: string
}

const CKEditorField: React.FC<CKeditorFieldProps> = ({ name, label, showError, helpText, subtitle }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleEditorChange = (content: string) => {
        setFieldValue(name, content);
    };
    
    return (
        <div className={`mb-2 yp-5 text-[14px] ${showError && 'text-red-500'}`}>
            {label && (
                <div className='py-1'>
                    <h3>{label}</h3>
                    {helpText && <span className='py-1 text-[13px] text-slate-500'>{helpText}</span>}
                    {subtitle && <div className='pt-4 pb-1'>{subtitle}</div>}
                </div>
            )}
            <CKEditor
                editor={ ClassicEditor }
                data={field.value}
                onReady={ editor => {
                    //console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const { name } = event
                    console.log( editor );
                }}
            />
        </div>
    )
}

export default CKEditorField