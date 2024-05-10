import { Box } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import styles from './richEditor.module.css';
import { TypeButton } from '../../types';

export default function RichEditor1({
  clasNames,
  htmlFor,
  text,
  required,
  value,
  errors,
  onEditorChange
}: TypeButton) {
  const combinedClass = `${styles.fromControl} ${clasNames || ''}`;

  return (
    <Box className={combinedClass.trim()}>
      <label className={styles.label} htmlFor={htmlFor}>
        {text} {required && <span className={styles.required}>*</span>}:
      </label>
      <Editor
        value={value}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          plugins: [
            'code', // Plugin mã nguồn
            'codesample', // Plugin mã nguồn mẫu
            'textcolor', // Plugin màu văn bản
            'link', // Plugin liên kết
            'fullscreen'
          ],
          toolbar:
            'undo redo | formatselect | bold italic forecolor backcolor | link | codesample code | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough ',
          content_style: 'body { font-family: Inter; font-size: 14px }'
        }}
        onEditorChange={onEditorChange}
      />
      {errors && <span className={styles.error}>{errors}</span>}
    </Box>
  );
}
