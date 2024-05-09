import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './backBtn.module.css';

export default function BackBtn() {
  return (
    <button className={styles.backBtn} onClick={() => window.history.back()}>
      <ChevronLeftIcon />
      Back
    </button>
  );
}
