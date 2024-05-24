// components/DraftEditorField.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftEditorField = ({ field, form, ...props }: any) => {
  const { name } = field;
  const editorState = field.value ? EditorState.createWithContent(convertFromRaw(JSON.parse(field.value))) : EditorState.createEmpty();

  const onEditorStateChange = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    form.setFieldValue(name, JSON.stringify(convertToRaw(contentState)));
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        {...props}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default DraftEditorField;
