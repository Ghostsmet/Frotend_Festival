import React, { useState, useEffect } from 'react';
import './Account.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Page/PageMain/Festivals/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();  
  
  const [userData, setUserData] = useState({
    full_name: '',
    email: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      const fullName = user.name || '';
      setUserData({
        full_name: fullName,
        email: user.email || ''
      });
      setEditForm({
        full_name: fullName,
        email: user.email || ''
      });
    }
  }, [user]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      
      if (editForm.full_name !== userData.full_name) {
        const response = await fetch('http://localhost:8081/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ full_name: editForm.full_name })
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Ошибка обновления профиля');
        }
      }
      
      if (editForm.email !== userData.email) {
        const response = await fetch('http://localhost:8081/user/email', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ new_email: editForm.email })
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Ошибка обновления email');
        }
      }
      
      updateUserProfile(editForm.full_name, editForm.email);
      setUserData(editForm);
      setSuccess('Данные успешно обновлены!');
      setIsEditing(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="account-page">Пожалуйста, войдите в систему</div>;
  }

  return (
    <>
      <Header />
      <div className="account-page">
        <div className="account-container">
          <h1>Аккаунт</h1>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>ФИО</label>
                <input 
                  type="text" 
                  name="full_name" 
                  value={editForm.full_name} 
                  onChange={handleEditChange} 
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={editForm.email} 
                  onChange={handleEditChange} 
                  required
                />
              </div>
              <div className="button-group">
                <button className="save-btn action-btn" onClick={handleSaveData} disabled={loading}>
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button className="save-btn action-btn" onClick={() => {
                  setIsEditing(false);
                  setEditForm(userData);
                }}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="user-info">
              <div className="info-card">
                <span className="value">{userData.full_name}</span>
              </div>
              <div className="info-card">
                <span className="value">{userData.email}</span>
              </div>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => setIsEditing(true)}>Изменить данные</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;