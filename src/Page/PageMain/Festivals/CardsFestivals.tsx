import React from 'react';
import '../../..//Components/btn.css';


function CardsFestivals({ title, subtitle, date, location, icon, }: any) {
  return (
    <div className="festival-card">
      {icon && <img className="card-icon" src={icon} alt={title} />}
      <h3 className="festival-title">{title}</h3>
      <p className="festival-subtitle">{subtitle}</p>
      <div className="festival-info">
      <p className="festival-date">{date}</p>
      <p className="festival-location">{location}</p>
      </div>
      <button className="btn">Оставить заявку</button>
    </div>
  );
}

export default CardsFestivals;