// components/TinyMCEField.tsx
import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEFieldProps {
  name: string
  label?: string
  showError?: boolean
  helpText?: string
  subtitle?: string
}

const TinyMCEField: React.FC<TinyMCEFieldProps> = ({ name, label, showError, helpText, subtitle }) => {
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
            <Editor
                value={field.value}
                onEditorChange={handleEditorChange}
                apiKey='t7im98jdedmtqmmkgztwoo0byvhr124jgl9n7ay42sub2zx7'
                init={{
                height: 300,
                menubar: true,
                directionality: 'ltr',
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | help' + 
                    'ltr rtl | superscript | subscript | image | lists  advlist | link',
                }}
            />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};

export default TinyMCEField;
