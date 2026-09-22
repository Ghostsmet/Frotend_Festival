import React, { useState } from 'react';
import './Authorization.css';  
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../PageMain/Festivals/AuthContext';

const Authorization = () => {
  const navigate = useNavigate();//переход
  const { login } = useAuth();//сохранения токена
  //состояние формы
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);//отключение кнопок

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isLogin) {
      // ВХОД через бэкенд
      try {
        const response = await fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();//получаем Promise с бэка
        
        //токен пришел
        if (response.ok && data.token) {
          // Сохраняем переданный токен
          login(email, password, data.user.role, data.user.full_name, data.token);
          navigate('/');
        } else {
          alert(data.error || 'Неверный email или пароль');
        }
      } catch (error) {
        alert('Сервер недоступен');
      }
    } else {
      // РЕГИСТРАЦИЯ
      setPasswordError('');
      
      if (!fullName || !email || !password || !confirmPassword) {
        alert('Заполните все поля');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        alert('Пароль должен быть не менее 6 символов');
        setIsLoading(false);
        return;
      }
      
      if (password !== confirmPassword) {
        setPasswordError('Пароли не совпадают');
        setIsLoading(false);
        return;
      }
      
      //запрос на регистрацию
      try {
        const response = await fetch('http://localhost:8081/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            full_name: fullName
          })
        });
        
        const data = await response.json();//получаем
        
      
        if (response.ok) {
          alert('Регистрация успешна!');
          
          // Автоматически входим
          const loginResponse = await fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const loginData = await loginResponse.json();
          if (loginData.token) {
            login(email, password, 'user', fullName, loginData.token);
          }
          navigate('/');
        } else {
          alert(data.error || 'Ошибка регистрации');
        }
      } catch (error) {
        alert('Сервер недоступен');
      }
    }
    setIsLoading(false);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/Authorization2');
  };

  if (isForgotPassword) {
    return (
      <>
        <Header />
        <div className="App1">
          <div className="auth-container">
            <h1>Восстановление пароля</h1>
            <form className="auth-form" onSubmit={handleForgotSubmit}>
              <input type="email" placeholder="Email при регистрации*" />
              <button type="submit" className="auth-btn">Отправить код</button>
            </form>
            <div className="auth-links">
              <button className="link-btn" onClick={() => setIsForgotPassword(false)}>
                Вернуться к входу
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="App1">
        <div className="auth-container">
          <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <input 
                type="text" 
                placeholder="ФИО" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{ color: '#000000', fontSize: '12px' }}
              />
            )}
            
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ color: '#000000', fontSize: '12px' }}
            />
            
            <input 
              type="password" 
              placeholder="Пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ color: '#000000', fontSize: '12px' }}
            />
            
            {!isLogin && (
              <>
                <input 
                  type="password" 
                  placeholder="Повторите пароль" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <span style={{ color: '#ff4444', fontSize: '12px' }}>
                    {passwordError}
                  </span>
                )}
              </>
            )}
            
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
            </button>
          </form>
          
          <div className="auth-links">
            <button className="link-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorization;