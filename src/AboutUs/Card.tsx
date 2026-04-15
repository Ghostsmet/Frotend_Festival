import React from 'react';

function Card({ title, description, icon }: any) {  // ← добавил :any
  return (
    <div className="advantage-card">
      {icon && <img className="card-icon" src={icon} alt={title} />}
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <button className="card-btn">Узнать</button>
      </div>
    </div>
  );
}

export default Card;