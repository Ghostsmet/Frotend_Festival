import React, { useState, useRef, useEffect } from 'react';
import { useChat } from './ChatContext';
import { useAuth } from '../../Page/PageMain/Festivals/AuthContext';
import './ChatWidget.css';

const ChatWidget = () => {
  // Получаем данные из Context
  const { messages = [], connectionStatus, sendMessage, fetchHistory } = useChat();
  const { isAdmin, user } = useAuth();  
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(Array.isArray(messages) ? messages.length : 0);

  const currentUsername = isAdmin ? 'Админ' : (user?.name || 'Пользователь');

  // Загружаем историю при открытии чата
  useEffect(() => {
    if (isOpen && fetchHistory) {
      fetchHistory();//открываем чат - подгружаем историю
    }
  }, [isOpen, fetchHistory]);

 //автопрокрутка
  useEffect(() => {
    if (messagesEndRef.current && messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  //новые непрочитанные
  useEffect(() => {
    if (!isOpen && Array.isArray(messages) && messages.length > prevMessagesLengthRef.current) {
      const newMessages = messages.slice(prevMessagesLengthRef.current);//новые сообщение
      const userMessages = newMessages.filter(
        msg => msg.type === 'chat' && msg.username !== currentUsername//чужие
      );
      setUnreadCount(prev => prev + userMessages.length);
    }
  }, [messages, isOpen, currentUsername]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText, currentUsername);// отправляем
      setInputText('');//очистили
    }
  };
  //проверка на мое ли сообщение
  const isOwnMessage = (msg: any) => {
    if (msg.type === 'system') return false;
    return msg.username === currentUsername;
  };

  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <>
      <div className="chat-button" onClick={handleOpen}>
        <img src="/message.svg" alt="Чат" className='icon-chat' />
        {unreadCount > 0 && <span className="chat-badge">{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <span>Чат поддержки</span>
              <span className={`status ${connectionStatus === 'Подключено' ? 'online' : 'offline'}`}>
                {connectionStatus}
              </span>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messageList.length === 0 ? (
              <div className="no-messages">Нет сообщений.</div>
            ) : (
              messageList.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.type === 'system' ? 'system' : 
                    isOwnMessage(msg) ? 'own' : 'other'
                  }`}
                >
                  {msg.type === 'system' ? (
                    <div className="system-text">{msg.message}</div>
                  ) : (
                    <>
                      <div className="message-sender">{msg.username}</div>
                      <div className="message-text">{msg.text}</div>
                      <div className="message-time">
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) : ''}
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ color: '#000000', fontSize: '12px' }}
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;