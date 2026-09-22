import React from 'react';
import './Main.css';
import '../../../Components/btn.css';
import AboutUs from '../AboutUs/AboutUs';
import { useNavigate } from 'react-router-dom';


function Main() {
  const navigate = useNavigate(); 
  return (
    <main className="main-content">
      <div className="hero-section">
        <img src="/Fon2.png" alt="Фон" className="center-image" />
        <div className='heading'>
        <h1 className='text-overlay h1'>Международные<br/> фестивали-конкурсы<br/>хореографического искусства</h1>
        <button className="btnn" onClick={() => navigate('/RegistrationForTheContest')}>Оставить заявку</button>
        </div>
      </div>
    </main>
  );
}

export default Main;