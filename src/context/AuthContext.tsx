import { ReactNode, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginGetUser, logoutUser } from '../services';
import i18n from '../types/i18n';

type AuthContextType = {
  loggedIn: boolean;
  login: (userData: any, isToHome?: boolean) => void;
  logout: () => void;
  updateProfile: () => void;
  changeLanguage: (lng: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  changeLanguage: (lng: string) => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));
  const [isUpdate, setIsUpdate] = useState(false);

  const updateProfile = () => {
    setIsUpdate(!isUpdate);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const login = async (token?: string, isToHome?: boolean) => {
    if (token) {
      try {
        const result = await loginGetUser(token);
        if (result?.data && result?.data?.user) {
          localStorage.setItem('user', JSON.stringify(result?.data?.user));
          setLoggedIn(true);
          if (isToHome) {
            navigate('/');
          } else {
            navigate(-1);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Unexpected error occurred! Please try again.');
      }
    }
  };

  const logout = async () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const id = JSON.parse(userData);
      if (id && id.user_id) {
        await logoutUser(id?.user_id);
      }
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, login, logout, updateProfile, changeLanguage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
