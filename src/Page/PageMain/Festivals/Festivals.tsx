import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Festivals.css';
import { useFestivals } from './FestivalsContext';
import { useAuth } from './AuthContext';

const Festivals = () => {
  const navigate = useNavigate();
  const { festivals, deleteFestival, loading, error } = useFestivals();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';

  if (loading) {
    return <div className="loading">Загрузка конкурсов...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="festivals-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 18vh', margin: 0 }}>
        <h2 className="festivals-heading">Наши фестивали</h2>
        {isAdmin && (
          <button className="add-festival-btn" onClick={() => navigate('/add-festival')}>
            + Добавить конкурс
          </button>
        )}
      </div>
      
      <div className="festivals-grid">
        {festivals && festivals.length > 0 ? (
          festivals.map((festival) => (
            <div key={festival.id} className="festival-card">
              {festival.icon && <img className="card-icon" src={festival.icon} alt="" />}
              <h3 className="festival-title">{festival.title}</h3>
              <div className="festival-info">
                <p className="festival-date">{festival.date}</p>
                <p className="festival-location">{festival.location}</p>
                <p className="festival-price">Стоимость: {festival.price} ₽</p>
                <p className="festival-participants">
                  Участников: {festival.current_participants} / {festival.max_participants}
                </p>
              </div>
              
              {!isAdmin && (
                <button className="btnrr" onClick={() => navigate('/RegistrationForTheContest')}>
                  Оставить заявку
                </button>
              )}
              
              {isAdmin && (
                <div className="admin-buttons">
                  <button className="view-participants-btn" onClick={() => navigate(`/participants/${festival.id}`)}>
                    Посмотреть списки участников
                  </button>
                  <button className="delete-btn" onClick={async () => {
                    if (window.confirm('Удалить фестиваль?')) {
                      await deleteFestival(festival.id);
                    }
                  }}>
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-festivals">Нет конкурсов</p>
        )}
      </div>
    </div>
  );
};

export default Festivals;  // ← только export default, без export { useAuth }