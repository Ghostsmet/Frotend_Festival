import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

interface Message {
  id?: number;
  type: 'chat' | 'system';
  username?: string;
  text?: string;
  message?: string;
  timestamp?: string;
}

interface ChatContextType {
  messages: Message[];
  connectionStatus: string;
  sendMessage: (text: string, username: string) => void;//отправка сообщений
  fetchHistory: () => Promise<void>;//загрузка сообщений
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);//глобал хранилище чата

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context; //возвращает messages, connectionStatus, sendMessage, fetchHistory 
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);//хранимые все сообщения
  const [connectionStatus, setConnectionStatus] = useState('Подключение...');
  const wsRef = useRef<WebSocket | null>(null);//ссылка на вэбсокет

  // Загрузка истории из БД
  const fetchHistory  = async () => {
    try {
      const token = localStorage.getItem('token');//берем токен 
      if (!token) return;
      //запрос чата
      const response = await fetch('http://localhost:8081/chat/history', {
        headers: { 'Authorization': `Bearer ${token}` }//отправляем на бэк
      });
      
      if (response.ok) {
        const history = await response.json();//получаем историю
        setMessages(history);//сохранение состояния
        console.log('Загружено сообщений:', history.length);
      }
    } catch (error) {
      console.log('Не удалось загрузить историю');
    }
  };

  // WebSocket подключение
  useEffect(() => {
    const token = localStorage.getItem('token'); //читаем токен
    if (!token) {
      setConnectionStatus('Войдите в систему');
      return;
    }
    
    fetchHistory ();
    
    const ws = new WebSocket(`ws://localhost:8081/ws?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('Подключено');
      console.log('WebSocket подключен');
    };

    ws.onerror = () => {
      setConnectionStatus('Ошибка подключения');
    };

    ws.onclose = () => {
      setConnectionStatus('Отключено');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.log('Ошибка при получении сообщения', error);
      }
    };

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = (text: string, username: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket не подключен');
      return;
    }

    const message = {
      type: 'chat',
      username: username,
      text: text,
      timestamp: new Date().toISOString()
    };
      //отправляем
    wsRef.current.send(JSON.stringify(message));
  };

  return (
    <ChatContext.Provider value={{ messages, connectionStatus, sendMessage, fetchHistory }}>
      {children}//получение доступа к чату
    </ChatContext.Provider>
  );
};