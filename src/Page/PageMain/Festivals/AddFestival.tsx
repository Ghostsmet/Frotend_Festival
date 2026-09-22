import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFestivals } from './FestivalsContext';
import './AddFestival.css';

const AddFestival = () => {
  const navigate = useNavigate();
  const { addFestival } = useFestivals();
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});//валидация
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('url');//загрузка картинок
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    price: '',
    max_participants: '',
    icon: ''
  });

  //обработка ошибок
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });//очищаем
    }
  };
//загрузка файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      setFormData({
        ...formData,
        icon: localUrl
      });
    }
  };
  //загрузка по урл
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      icon: url
    });
    setImagePreview(url);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Введите название конкурса';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно быть не менее 3 символов';
    }
    
    if (!formData.date) {
      newErrors.date = 'Выберите дату проведения';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Введите место проведения';
    } else if (formData.location.length < 3) {
      newErrors.location = 'Место должно быть не менее 3 символов';
    }
    
    if (!formData.price) {
      newErrors.price = 'Введите стоимость участия';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Введите корректную сумму';
    }
    
    if (!formData.max_participants) {
      newErrors.max_participants = 'Введите максимальное количество участников';
    } else if (isNaN(Number(formData.max_participants)) || Number(formData.max_participants) < 1) {
      newErrors.max_participants = 'Введите корректное количество (минимум 1)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {//проверка валидации
      return;
    }
    
    try {
      await addFestival({
        title: formData.title,
        date: formData.date,
        location: formData.location,
        price: Number(formData.price),
        max_participants: Number(formData.max_participants),
        current_participants: 0,
        icon: formData.icon || '/default-festival.png',
        subtitle: formData.title
      });
      
      alert('Фестиваль добавлен!');
      navigate('/');
    } catch (error) {
      alert('Ошибка при добавлении фестиваля');
    }
  };

  return (
    <div className="add-festival-page">
      <div className="add-festival-container">
        <h1>Добавить конкурс</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название конкурса *</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title}
              className={errors.title ? 'error-input' : ''}
              onChange={handleChange} 
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Дата проведения *</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date}
              className={errors.date ? 'error-input' : ''}
              onChange={handleChange} 
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          
          <div className="form-group">
            <label>Место проведения *</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location}
              className={errors.location ? 'error-input' : ''}
              onChange={handleChange} 
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
          
          <div className="form-group">
            <label>Стоимость участия (₽) *</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price}
              className={errors.price ? 'error-input' : ''}
              onChange={handleChange} 
              placeholder="1000"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
          
          <div className="form-group">
            <label>Максимальное количество участников *</label>
            <input 
              type="number" 
              name="max_participants" 
              value={formData.max_participants}
              className={errors.max_participants ? 'error-input' : ''}
              onChange={handleChange} 
              placeholder="50"
            />
            {errors.max_participants && <span className="error-message">{errors.max_participants}</span>}
          </div>
          
          <div className="form-group">
            <label>Изображение</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>

            </div>
            
            {uploadMethod === 'file' ? (
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ marginBottom: '10px' }} />
            ) : (
              <input type="text" name="icon" value={formData.icon} onChange={handleUrlChange} placeholder="https://example.com/image.png" />
            )}
            
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img src={imagePreview} alt="Превью" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '8px' }} />
                <small style={{ display: 'block', color: '#666' }}>Предпросмотр</small>
              </div>
            )}
            
            <small style={{ color: '#aaa', display: 'block', marginTop: '5px' }}>
              Введите URL
            </small>
          </div>
          
          <button type="submit" className="submit-btn">Добавить фестиваль</button>
          <button type="button" className="submit-btn" onClick={() => navigate('/')}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default AddFestival;