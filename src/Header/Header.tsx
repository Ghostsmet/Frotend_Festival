import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <button className="accounting" onClick={() => window.location.href='#about'}><img src="/account_circle.png" className="logo-img" /></button>
        <button className="nav-btn" onClick={() => window.location.href='#about'}>Войти</button>
      </div>
      <nav>
        <ul className="nav-links">
<li><button className="nav-btn" onClick={() => window.location.href='#home'}>Главная</button></li>
          <li><button className="nav-btn" onClick={() => window.location.href='#about'}>О Конкурсе</button></li>
          <li><button className="nav-btn" onClick={() => window.location.href='#services'}>Положение конкурсов</button></li>
          <li><button className="nav-btn" onClick={() => window.location.href='#contact'}>Заявка на участие</button></li>
          
        </ul>
        
      </nav>
            <nav>
        <ul className="nav-links">
          <li><button className="nav-btn" onClick={() => window.location.href='#contacts'}>Контакты</button></li>
        </ul>
        
      </nav>
    </header>
  );
}

export default Header;