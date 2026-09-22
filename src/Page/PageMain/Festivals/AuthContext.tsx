import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  isAdmin: boolean;//проверка на админа
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'admin', name?: string, realToken?: string) => void;
  logout: () => void;
  updateUserProfile: (name: string, email: string) => void;// функция обновления профиля
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);// получаем данные из контекста
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
//проверка на админа
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'user' | 'admin', name?: string, realToken?: string) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    //сохраняем
    setUser({
      name: name || email.split('@')[0],
      email: email,
      role: role
    });
    
    // Сохраняем  токен
    if (realToken) {
      localStorage.setItem('token', realToken);
    }
    localStorage.setItem('user', JSON.stringify({
      name: name || email.split('@')[0],
      email: email,
      role: role
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUserProfile = (name: string, email: string) => {
    if (user) {
      const updatedUser = { ...user, name, email };//обновленный поьзователь
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify({//обновляем данные
        name: name,
        email: email,
        role: user.role
      }));
    }
  };

  //читаем токен
  //если данные есть-восстанавливаем
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setIsAdmin(userData.role === 'admin');
        setUser(userData);
      } catch (error) {
        console.error('Ошибка при восстановлении сессии', error);
      }
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};