import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gemstone_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const { data } = await api.post('https://gemstone-recommendation-app.onrender.com/auth/login', { email, password });
    localStorage.setItem('gemstone_token', data.token);
    localStorage.setItem('gemstone_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('https://gemstone-recommendation-app.onrender.com/auth/register', payload);
    localStorage.setItem('gemstone_token', data.token);
    localStorage.setItem('gemstone_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('gemstone_token');
    localStorage.removeItem('gemstone_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
