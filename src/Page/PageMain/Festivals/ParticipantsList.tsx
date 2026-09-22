import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFestivals } from './FestivalsContext';
import './ParticipantsList.css';

interface Participant {
  id: string;
  user_id: string;
  competition_id: number;
  status: string;
  team_name: string;
  age_category: string;
  city: string;
  participants_count: number;
  phone: string;
  dance_name: string;
  created_at: string;
}

const ParticipantsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { festivals } = useFestivals();
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const festivalId = Number(id);
  const festival = festivals.find(f => f.id === festivalId);

  // Загрузка участников
  const fetchParticipants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8082/competitions/${id}/participants`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки участников');
      }
      
      const data = await response.json();
      setParticipants(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  // Удаление заявки
  const deleteBooking = async (bookingId: string) => {
    if (!window.confirm('Удалить эту заявку?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8082/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert('Заявка удалена');
        fetchParticipants();
      } else {
        const data = await response.json();
        alert(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен');
    }
  };

  // Изменение статуса заявки
  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8082/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        alert(`Статус изменён на ${newStatus}`);
        fetchParticipants();
      } else {
        const data = await response.json();
        alert(data.error || 'Ошибка изменения статуса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен');
    }
  };

  useEffect(() => {
    if (id) {
      fetchParticipants();
    }
  }, [id]);

  if (!festival) {
    return <div className="not-found">Фестиваль не найден</div>;
  }

  if (loading) {
    return <div className="loading">Загрузка участников...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="participants-page">
      <div className="participants-container">
        <button className="back-btn" onClick={() => navigate('/')}>← Назад</button>
        <h1>Списки участников</h1>
        <h2>{festival.title}</h2>
        
        {!participants || participants.length === 0 ? (
          <p className="no-participants">Пока нет заявок на этот конкурс</p>
        ) : (
          <div className="table-wrapper">
            <table className="participants-table">
              <thead>
                <tr>
                  <th>Название коллектива / ФИО</th>
                  <th>Возрастная категория</th>
                  <th>Город</th>
                  <th>Кол-во участников</th>
                  <th>Телефон</th>
                  <th>Название номера</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(p => (
                  <tr key={p.id}>
                    <td>{p.team_name}</td>
                    <td>{p.age_category}</td>
                    <td>{p.city}</td>
                    <td>{p.participants_count}</td>
                    <td>{p.phone}</td>
                    <td>{p.dance_name}</td>
                    <td className={`status-${p.status}`}>
                      <select 
                        value={p.status}
                        onChange={(e) => updateBookingStatus(p.id, e.target.value)}
                        className="status-select"
                        style={{ color: '#000000', fontSize: '12px' }}
                      >
                        <option value="pending">На рассмотрении</option>
                        <option value="confirmed">Подтверждена</option>
                        <option value="rejected">Отклонена</option>
                      </select>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="delete-booking-btn"
                        onClick={() => deleteBooking(p.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsList;