import React, { useState } from 'react';
import '../PageAuthorization1/Authorization.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }
    
  
    alert('Пароль успешно изменён!');
    navigate('/Authorization'); 
  };
  


  return (
    <>
      <Header />
      <div className="App1">
        <div className="auth-container">
          <h1>Новый пароль</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <input 
              type="password" 
              placeholder="Новый пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <input 
              type="password" 
              placeholder="Подтвердите пароль" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <button type="submit" className="auth-btn">
              Сохранить
            </button>
          </form>
          
          <div className="auth-links">
            <button 
              className="link-btn" 
              onClick={() => navigate('/Authorization')}
            >
              ← Вернуться к входу
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;