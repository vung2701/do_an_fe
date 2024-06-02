import { Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import User from './User';
import { useEffect, useState } from 'react';
import i18n from '../../types/i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { LANGUAGES } from '../../constants/Language';

const Menu = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuItem} ${
            location.pathname === '/articles' ? styles.active : ''
          }`}
        >
          <Link to="/articles">{t('ARTICLE')}</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === '/codes' ? styles.active : ''
          }`}
        >
          <Link to="/codes">Code</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === '/posts' ? styles.active : ''
          }`}
        >
          <Link to="/posts">{t('POST')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default function Header() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const { changeLanguage } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { t } = useTranslation();

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const toggleLanguage = () => {
    setCurrentLanguage((prevLanguage) => (prevLanguage == 'vi' ? 'en' : 'vi'));
  };

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <header className={styles.header}>
      <Container className="container">
        <Box className={styles.mobileBtn}>
          <button onClick={handleMobileMenu}>
            {isMobileMenu ? (
              <>
                <CloseIcon className={styles.closeMobileIcon} />
                <ul className={styles.mobileList}>
                  <li className={styles.mobileItem}>
                    <Link to="/articles">{t('ARTICLE')}</Link>
                  </li>
                </ul>
                <ul className={styles.mobileList}>
                  <li className={styles.mobileItem}>
                    <Link to="/codes">Code</Link>
                  </li>
                </ul>
                <ul className={styles.mobileList}>
                  <li className={styles.mobileItem}>
                    <Link to="/posts">{t('POST')}</Link>
                  </li>
                </ul>
              </>
            ) : (
              <MenuIcon className={styles.menuMobileIcon} />
            )}
          </button>
        </Box>
        <Box className={styles.headerLeft}>
          <Link to={'/'}>
            <h1 className={styles.logo}>ITV</h1>
          </Link>
          <Menu />
        </Box>
        <Box className={styles.headerRight}>
          <button className={styles.btnLanguage}>
            <img
              src={currentLanguage == 'vi' ? LANGUAGES[0].flag : LANGUAGES[1].flag}
              alt="flag"
              loading="lazy"
              onClick={toggleLanguage}
            />
          </button>
          <User />
        </Box>
      </Container>
    </header>
  );
}
