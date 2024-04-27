import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './details.module.css';

export default function LimitDetails() {
  return (
    <Box className={styles.limitDetails}>
      <div>
        <span>Please login to view more content.</span>
        <Link to="/login">Login</Link>
        <div className={styles.readed}>
          {/* LimitNoti
          <Link to="/articles" state="read">
            Here
          </Link> */}
        </div>
      </div>
    </Box>
  );
}
