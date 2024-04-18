import { Link } from 'react-router-dom';
import { TypeCustomLinks } from '../../types';
import styles from './customLinks.module.css';

export default function CustomLinks({ name, links, classNameAdd }: TypeCustomLinks) {
  const combinedClass = `${styles.btn} ${classNameAdd || ''}`;

  return (
    <Link to={links || ''} className={combinedClass.trim()}>
      {name}
    </Link>
  );
}
