'use client'

import React, { useState } from 'react'
import { ErrorMessage, useField } from 'formik';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

type TextEditorProps = {
    name: string
    label?: string
    showError?: boolean
}

const TextEditor: React.FC<TextEditorProps> = ({ name, label, showError }) => {
    const [field, meta, helpers] = useField(name)
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const { value } = meta;
    const { setValue } = helpers;
    const { onBlur } = field

    const handleEditorChange = (state: any) => {
        setEditorState(state);
      };

    return (
        <div className={`mb-2 text-[14px] ${showError && 'text-red-500'}`}>
             {label && (
                <div className='py-1'>
                    <h3>{label}</h3>
                </div>
            )}
            <Editor 
                editorState={editorState} 
                onChange={setValue} 
            />
            {showError && (
                <ErrorMessage name={name} />
            )}
        </div>
    )
}

export default TextEditor