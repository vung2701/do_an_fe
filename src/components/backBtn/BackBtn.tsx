import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './backBtn.module.css';
import { useTranslation } from 'react-i18next';

export default function BackBtn() {
  const { t } = useTranslation();
  return (
    <button className={styles.backBtn} onClick={() => window.history.back()}>
      <ChevronLeftIcon />
      {t('BACK')}
    </button>
  );
}
