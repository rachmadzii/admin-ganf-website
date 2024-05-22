import { createContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isAuthenticated = Cookies.get('isAuthenticated');

  const login = (newAccessToken) => {
    Cookies.set('accessToken', newAccessToken);
    Cookies.set('isAuthenticated', true);
    window.location = '/';
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('isAuthenticated');
    window.location = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
