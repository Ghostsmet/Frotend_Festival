import React from 'react';
import './Main.css';

function Main() {
  return (
    <main className="main-content">
      <div className="hero-section">
        <img src="/Fon2.png" alt="Фон" className="center-image" />
        <h1 className='text-overlay h1'>Международные<br></br> фестивали-конкурсы <br></br> хореографического искусства</h1>
        <button className="btn">Оставить заявку</button>
      </div>
    </main>
  );
}

export default Main;