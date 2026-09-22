import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './RegistrationForTheContest.css';
import '../../Components/Maps/Maps.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useFestivals } from '../PageMain/Festivals/FestivalsContext';

interface FormData {
  competition_id: number;     
  team_name: string;           
  age_category: string;        
  city: string;
  participants_count: number;  
  phone: string;
  dance_name: string;          
}

const RegistrationForTheContest = () => {
  const navigate = useNavigate();
  const { festivals } = useFestivals();
  const [isCompetitionOpen, setIsCompetitionOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<FormData>();

  const ageOptions = [
    { value: '7-11', label: '7-11 лет' },
    { value: '12-15', label: '12-15 лет' },
    { value: '16-18', label: '16-18 лет' },
    { value: '19-23', label: '19-23 лет' }
  ];

  const handleSelectCompetition = (id: number, title: string, date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('ru-RU');
    setSelectedCompetition(`${title} - ${formattedDate}`);
    setIsCompetitionOpen(false);
    setValue('competition_id', id);
  };

  const handleSelectAge = (value: string, label: string) => {
    setSelectedAge(label);
    setIsAgeOpen(false);
    setValue('age_category', value);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Пожалуйста, войдите в систему');
        navigate('/Authorization');
        return;
      }

      const response = await fetch('http://localhost:8082/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          competition_id: Number(data.competition_id),
          team_name: data.team_name,
          age_category: data.age_category,
          city: data.city,
          participants_count: Number(data.participants_count),
          phone: data.phone,
          dance_name: data.dance_name
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Заявка успешно отправлена!');
        reset();
        setSelectedCompetition('');
        setSelectedAge('');
        navigate('/'); 
      } else {
        alert(result.error || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен');
    }
  };

  return (
    <>
      <Header />
      <div className="application-page">
        <div className="application-container">
          <h1>Заявка на конкурс</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Кастомный селект для выбора конкурса */}
            <div className="form-group">
              <label>Выберите конкурс *</label>
              
              <div className="custom-select-container">
                <div 
                  className={`spisok ${errors.competition_id ? 'error-input' : ''}`}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsCompetitionOpen(!isCompetitionOpen)}
                >
                  {selectedCompetition || 'Выберите конкурс'}
                  <span style={{ fontSize: '12px' }}>{isCompetitionOpen ? '▲' : '▼'}</span>
                </div>
                
                {isCompetitionOpen && (
                  <div className="custom-select-dropdown">
                    <div 
                      className="custom-select-option"
                      onClick={() => {
                        setSelectedCompetition('');
                        setIsCompetitionOpen(false);
                        setValue('competition_id', 0);
                      }}
                    >
                      Выберите конкурс
                    </div>
                    {festivals.map((festival) => (
                      <div 
                        key={festival.id}
                        className="custom-select-option"
                        onClick={() => handleSelectCompetition(festival.id, festival.title, festival.date)}
                      >
                        {festival.title} - {new Date(festival.date).toLocaleDateString('ru-RU')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <input type="hidden" {...register('competition_id', { required: 'Выберите конкурс' })} />
              {errors.competition_id && <span className="error-message">{errors.competition_id.message}</span>}
            </div>

            <div className="form-group">
              <label>Название коллектива или Ф.И.О. солиста *</label>
              <input 
                type="text" 
                className={errors.team_name ? 'error-input' : ''}
                {...register('team_name', { 
                  required: 'Введите название коллектива или ФИО',
                  minLength: { value: 2, message: 'Минимум 2 символа' }
                })}
              />
              {errors.team_name && <span className="error-message">{errors.team_name.message}</span>}
            </div>

            {/* Кастомный селект выбор возраста */}
            <div className="form-group">
              <label>Полных лет (возрастная категория для коллективов) *</label>
              
              <div className="custom-select-container">
                <div 
                  className={`spisok ${errors.age_category ? 'error-input' : ''}`}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsAgeOpen(!isAgeOpen)}
                >
                  {selectedAge || 'Выберите сколько лет'}
                  <span style={{ fontSize: '12px' }}>{isAgeOpen ? '▲' : '▼'}</span>
                </div>
                
                {isAgeOpen && (
                  <div className="custom-select-dropdown">
                    <div 
                      className="custom-select-option"
                      onClick={() => {
                        setSelectedAge('');
                        setIsAgeOpen(false);
                        setValue('age_category', '');
                      }}
                    >
                      Выберите сколько лет
                    </div>
                    {ageOptions.map((option) => (
                      <div 
                        key={option.value}
                        className="custom-select-option"
                        onClick={() => handleSelectAge(option.value, option.label)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <input type="hidden" {...register('age_category', { required: 'Выберите возрастную категорию' })} />
              {errors.age_category && <span className="error-message">{errors.age_category.message}</span>}
            </div>

            <div className="form-group">
              <label>Откуда участник (коллектив)</label>
              <input 
                type="text" 
                {...register('city', { 
                  minLength: { value: 2, message: 'Минимум 2 символа' }
                })}
              />
              {errors.city && <span className="error-message">{errors.city.message}</span>}
            </div>

            <div className="form-group">
              <label>Количество участников (соло или ансамбль) *</label>
              <input 
                type="number" 
                className={errors.participants_count ? 'error-input' : ''}
                {...register('participants_count', { 
                  required: 'Введите количество участников',
                  min: { value: 1, message: 'Минимум 1 участник' },
                  max: { value: 25, message: 'Максимум 25 участников' }
                })}
              />
              {errors.participants_count && <span className="error-message">{errors.participants_count.message}</span>}
              <small style={{ color: '#aaa', display: 'block', marginTop: '5px' }}>
                Максимальное количество участников: 25
              </small>
            </div>

            <div className="form-group">
              <label>Контактный телефон *</label>
              <input 
                type="tel" 
                className={errors.phone ? 'error-input' : ''}
                {...register('phone', { 
                  required: 'Введите номер телефона',
                  pattern: { value: /^\+7[0-9]{10}$/, message: 'Введите корректный номер телефона' }
                })}
              />
              {errors.phone && <span className="error-message">{errors.phone.message}</span>}
            </div>

            <div className="form-group">
              <label>Название конкурсного номера *</label>
              <input 
                type="text" 
                className={errors.dance_name ? 'error-input' : ''}
                {...register('dance_name', { 
                  required: 'Введите название номера',
                  minLength: { value: 2, message: 'Минимум 2 символа' }
                })}
              />
              {errors.dance_name && <span className="error-message">{errors.dance_name.message}</span>}
            </div>

            <button type="submit" className="submit-btnss" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить на рассмотрение'}
            </button>
          </form>
        </div>
        
   
        <div className="maps-container">
          <div className="right-content">
            <div className="maps-left">
              <iframe
                src="https://yandex.ru/map-widget/v1/org/dvorets_kultury_rossiya/194032926432/?ll=45.968832%2C51.579844&z=16"
                width="100%"
                height="456px"
                style={{ borderRadius: '20px', border: 0 }}
                title="Карта ДК Россия, Саратов"
                allowFullScreen
              />
            </div>
          
            <div className="maps-right">
              <div className="textabout1">
                <p>Без выходных 09:00 - 19:00</p>
                <p className="phone">+7 (987) 80-806-422</p>
                <p className="address">Адрес: площадь имени В.И. Ленина, 1</p>
              </div>

              <div className="soc-seti">
                <img className="icon" src="/instagram.png" alt="Instagram" />
                <img className="icon" src="/telegram.png" alt="Telegram" />
                <img className="icon" src="/whatsapp.png" alt="WhatsApp" />
                <img className="icon" src="/vk.png" alt="VK" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForTheContest;