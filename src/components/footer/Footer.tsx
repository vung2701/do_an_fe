import { useTranslation } from 'react-i18next';
import styles from './footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <section className={styles.footerBotom}>
        <p>© 2024 ITV. {t('FOOTER')}</p>
      </section>
    </footer>
  );
}
