import { Container } from '@mui/material';
import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <Container className={styles.notFound}>
      <div>
        <h2>404</h2>
      </div>
    </Container>
  );
}
