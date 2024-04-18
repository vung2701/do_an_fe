import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';
import { useState } from 'react';
import { TypeButton } from '../../types';
import styles from './input.module.css';

export default function Input({
  clasNames,
  text,
  htmlFor,
  errors,
  id,
  onChange,
  value,
  name,
  required,
  type,
  placeholder,
  autoComplete
}: TypeButton) {
  const combinedClass = `${styles.fromControl} ${clasNames || ''}`;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isPasswordType = type === 'password' || type === 'text';

  return (
    <Box className={combinedClass.trim()}>
      <label htmlFor={htmlFor}>
        {text} {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.inputs}>
        <input
          autoComplete={autoComplete}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          id={id}
          type={showPassword ? 'text' : type}
        />
        {isPasswordType && (
          <Box className={styles.icon} onClick={togglePasswordVisibility}>
            {type === 'password' &&
              (showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />)}
          </Box>
        )}
      </div>

      {errors && <span className={styles.error}>{errors}</span>}
    </Box>
  );
}
