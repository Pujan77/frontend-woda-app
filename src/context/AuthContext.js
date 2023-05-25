import { createContext, useState } from 'react';
import { loginAPI } from '../services/authAPI';
import { useResponse } from './ErrorContext';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );
  const [loggedIn, setLoggedIn] = useState(() =>
    localStorage.getItem('authTokens') ? true : false
  );
  const { showSuccess } = useResponse();
  let loginUser = async e => {
    let body = {
      email: e.email,
      password: e.password,
    };

    try {
      const response = await loginAPI(body);
      let userData = response.data.data;
      let tokens = {
        access: response.data.data.token,
      };
      setAuthTokens(tokens);
      setLoggedIn(true);
      setUser(userData);
      localStorage.setItem('authTokens', JSON.stringify(tokens));
      localStorage.setItem('user', JSON.stringify(userData));
      return response;
    } catch (error) {
      throw error;
    }
  };

  let logoutUser = async e => {
    setAuthTokens(null);
    setUser(null);
    setLoggedIn(false);
    localStorage.clear();
    showSuccess('Logged Out Successfully.');
  };

  let contextData = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
