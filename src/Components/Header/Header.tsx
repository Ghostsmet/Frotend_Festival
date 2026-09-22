import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 
  if (isMobile) {
    return (
      <header className="header-mobile">
        <div className="logo-mobile">
          <button className="accounting-mobile" onClick={() => navigate('/account')}>
            <img src="/account_circle.png" className="logo-img-mobile" alt="Аккаунт" />
          </button>
          <button className="nav-btn-mobile" onClick={() => navigate('/Authorization')}>Войти</button>
        </div>

        <button className="burger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <button className="mobile-nav-btn" onClick={() => { navigate('/'); setMenuOpen(false); }}>Главная</button>
          <button className="mobile-nav-btn" onClick={() => { navigate('/about-competition'); setMenuOpen(false); }}>О Конкурсе</button>
          <button className="mobile-nav-btn" onClick={() => { navigate('/Pologenie'); setMenuOpen(false); }}>Положение конкурсов</button>
          <button className="mobile-nav-btn" onClick={() => { navigate('/RegistrationForTheContest'); setMenuOpen(false); }}>Заявка на участие</button>
          <button className="mobile-nav-btn" onClick={() => { navigate('/Contacts'); setMenuOpen(false); }}>Контакты</button>
        </div>
      </header>
    );
  }


  return (
    <header className="header">
      <div className="logo">
        <button className="accounting" onClick={() => navigate('/account')}>
          <img src="/account_circle.png" className="logo-img" alt="Аккаунт" />
        </button>
        <button className="nav-btn" onClick={() => navigate('/Authorization')}>Войти</button>
      </div>
      <nav>
        <ul className="nav-links">
          <li><button className="nav-btn" onClick={() => navigate('/')}>Главная</button></li>
          <li><button className="nav-btn" onClick={() => navigate('/about-competition')}>О Конкурсе</button></li>
          <li><button className="nav-btn" onClick={() => navigate('/Pologenie')}>Положение конкурсов</button></li>
          <li><button className="nav-btn" onClick={() => navigate('/RegistrationForTheContest')}>Заявка на участие</button></li>
        </ul>
      </nav>
      <nav>
        <ul className="nav-links">
          <li><button className="nav-btn" onClick={() => navigate('/Contacts')}>Контакты</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;