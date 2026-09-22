import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Festival {
  id: number;
  title: string;
  date: string;
  location: string;
  price: number;
  max_participants: number;
  current_participants: number;
  subtitle?: string;
  icon?: string;
}

interface FestivalsContextType {
  festivals: Festival[];
  addFestival: (festival: Omit<Festival, 'id'>) => void; // добавление
  deleteFestival: (id: number) => void;
  loading: boolean;
  error: string;
}

const FestivalsContext = createContext<FestivalsContextType | undefined>(undefined);

export const useFestivals = () => {
  const context = useContext(FestivalsContext);
  if (!context) {
    throw new Error('useFestivals must be used within FestivalsProvider');
  }
  return context;
};

export const FestivalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [festivals, setFestivals] = useState<Festival[]>([]);//список фестивалей
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //запрашиваем
  const fetchCompetitions = async () => {
    try {
      const response = await fetch('http://localhost:8082/competitions');
      if (!response.ok) {
        throw new Error('Ошибка загрузки конкурсов');
      }
      const data = await response.json();
      
      // Защита: если data не массив, используем пустой массив
      const formattedData = Array.isArray(data) ? data.map((comp: any) => ({
        id: comp.id,
        title: comp.title,
        date: new Date(comp.date).toLocaleDateString('ru-RU'),
        location: comp.location,
        price: comp.price,
        max_participants: comp.max_participants,
        current_participants: comp.current_participants,
        subtitle: comp.subtitle || comp.title,
        icon: comp.icon || '/default-festival.png'
      })) : [];
      
      //сохраняем состояние
      setFestivals(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setFestivals([]); // при ошибке — пустой массив
    } finally {
      setLoading(false);
    }
  };

  const addFestival = async (festival: Omit<Festival, 'id'>) => {
    try {
      const token = localStorage.getItem('token');//берем токен
      const response = await fetch('http://localhost:8082/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: festival.title,
          date: festival.date,
          location: festival.location,
          price: festival.price,
          max_participants: festival.max_participants
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка создания конкурса');
      }

      const newCompetition = await response.json();
      //сохраняем
      setFestivals(prev => [...prev, {
        ...newCompetition,
        date: new Date(newCompetition.date).toLocaleDateString('ru-RU'),
        subtitle: festival.title,
        icon: festival.icon || '/default-festival.png'
      }]);
      
      await fetchCompetitions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при добавлении');
      throw err;
    }
  };

  const deleteFestival = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8082/competitions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления конкурса');
      }

      setFestivals(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении');
      throw err;
    }
  };

  useEffect(() => {
    fetchCompetitions();//загружаем при загрузке фестиваля
  }, []);

  return (
    <FestivalsContext.Provider value={{ festivals, addFestival, deleteFestival, loading, error }}>
      {children}
    </FestivalsContext.Provider>
  );
};

export default FestivalsContext;