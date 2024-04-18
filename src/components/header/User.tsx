import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { concatLinkImage } from '../../types/untils';
import styles from './header.module.css';
import { useEffect, useState } from 'react';
import { getMemberId } from '../../services';
import { TypeMemberId } from '../../types';

const User = () => {
  const { updateProfile } = useAuth();
  const { logout, loggedIn } = useAuth();
  const [profile, setProfile] = useState<TypeMemberId>();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        const data = await getMemberId(user.user_id);
        setProfile(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchProfile();
    }
  }, [updateProfile]);

  const handleLogout = async () => {
    logout();
  };

  return (
    <nav className={styles.user}>
      <div className={styles.icon}>
        {loggedIn ? (
          <>
            <img
              src={
                profile?.image
                  ? concatLinkImage(profile?.image)
                  : '/public/images/6596121.png'
              }
              alt="user"
              className={styles.imgUser}
            />
            <ul className={styles.subMenu}>
              {loggedIn ? (
                <>
                  <li>
                    <PermIdentityIcon />
                    <Link to={`/profile/${profile?.user_id}`}>Profile</Link>
                  </li>

                  <li onClick={handleLogout}>
                    <LogoutIcon />
                    <Link to="">Logout</Link>
                  </li>
                </>
              ) : (
                ''
              )}
            </ul>
          </>
        ) : (
          <>
            <Link
              to="/login"
              state={location.pathname === '/register'}
              className={styles.logiHeader}
            >
              <LoginIcon />
              <span>Login</span>
            </Link>
            <span className={styles.line}>/</span>
            <Link to="/register" className={styles.logiHeader}>
              <span>Register </span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default User;
