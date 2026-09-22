import React, { useState } from 'react';
import '../PageAuthorization1/Authorization.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';


const Authorization2 = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Для учебных целей: код "1234" работает
    if (code === '1234') {
      alert('Код верный!');
      navigate('/new-password'); // ← ЭТА СТРОКА ДОЛЖНА БЫТЬ
    } else {
      alert('Неверный код. Попробуйте ещё раз.');
    }
  };

  return (
    <>
      <Header />
      <div className="App1">
        <div className="auth-container">
          <h1>Введите код</h1>
          <p style={{ color: 'white', marginBottom: '20px' }}>
            Мы отправили код на вашу почту
          </p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Введите код из письма" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            
            <button type="submit" className="auth-btn">
              Подтвердить
            </button>
          </form>
          
          <div className="auth-links">
            <button 
              className="link-btn" 
              onClick={() => navigate('/Authorization')}
            >
              Вернуться к входу
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorization2;