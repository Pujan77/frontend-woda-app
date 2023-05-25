import React from 'react';
import { useField } from 'formik';
import { Box, FormErrorMessage } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichTextEditorInput = ({ setFieldValue, label, ...props }) => {
  const [meta] = useField(props);

  return (
    <Box>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFieldValue('viewPage', data);
        }}
        // onBlur={(event, editor) => {
        //   console.log('Blur.', editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor);
        // }}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </Box>
  );
};

export default RichTextEditorInput;
