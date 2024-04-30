import { Box } from '@mui/material';
import styles from './richEditor.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { TypeButton } from '../../types';

export default function RichEditor({
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
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onEditorChange}
        modules={RichEditor.modules} // Custom modules
        formats={RichEditor.formats} // Custom formats
      />
      {errors && <span className={styles.error}>{errors}</span>}
    </Box>
  );
}

RichEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

RichEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];
