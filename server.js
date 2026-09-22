const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`Новый пользователь присоединился. Всего: ${clients.size}`);

  // Только ОДНО приветственное сообщение для нового пользователя
  ws.send(JSON.stringify({
    type: 'system',
    message: 'Добро пожаловать в чат поддержки!'
  }));

  // Оповещаем ВСЕХ остальных о новом пользователе (только один раз)
  broadcast({
    type: 'system',
    message: 'Новый пользователь присоединился к чату'
  }, ws); // ← ws исключаем, чтобы не отправлять самому себе

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log(`[${message.username}]: ${message.text}`);
      
      // Отправляем сообщение ВСЕМ клиентам
      broadcast({
        type: 'chat',
        username: message.username,
        text: message.text,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Ошибка при парсинге сообщения:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`Пользователь отключился. Всего: ${clients.size}`);
    
    // Оповещаем всех, что пользователь вышел
    broadcast({
      type: 'system',
      message: 'Пользователь покинул чат'
    });
  });

  ws.on('error', (error) => {
    console.error('WebSocket ошибка:', error);
  });
});

function broadcast(data, exclude = null) {
  const message = JSON.stringify(data);
  for (const client of clients) {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

console.log('WebSocket сервер запущен на ws://localhost:5000');