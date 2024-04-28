import { Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import User from './User';
import { useState } from 'react';

const Menu = () => {
  const location = useLocation();

  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuItem} ${
            location.pathname === '/articles' ? styles.active : ''
          }`}
        >
          <Link to="/articles">Article</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === '/srccode' ? styles.active : ''
          }`}
        >
          <Link to="/srccode">Source Code</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === '/posts' ? styles.active : ''
          }`}
        >
          <Link to="/posts">Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default function Header() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };
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
                    <Link to="/articles">Article</Link>
                  </li>
                </ul>
                <ul className={styles.mobileList}>
                  <li className={styles.mobileItem}>
                    <Link to="/srccode">Source Code</Link>
                  </li>
                </ul>
                <ul className={styles.mobileList}>
                  <li className={styles.mobileItem}>
                    <Link to="/posts">Post</Link>
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
        <User />
      </Container>
    </header>
  );
}
