import { Typography } from '@mui/material';
import styles from './titles.module.css';

interface TypeTitles {
  name: string | undefined;
  classNameAdd: string | undefined;
}

export default function Titles({ name, classNameAdd }: TypeTitles) {
  const combinedClass = `${styles.titles} ${classNameAdd || ''}`;
  return (
    <Typography variant="h4" className={combinedClass.trim()}>
      {name}
    </Typography>
  );
}
