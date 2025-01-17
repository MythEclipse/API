import { WebSocket } from 'ws';
import { ChatMessage } from '../models/chatModel';
import logger from '../utils/logger';

const clients: Set<WebSocket> = new Set();

export const handleConnection = (ws: WebSocket) => {
  clients.add(ws);
  logger.info('New client connected');

  ws.on('message', (data) => {
    const message: ChatMessage = {
      user: `User-${Math.floor(Math.random() * 1000)}`,
      text: data.toString(),
    };

    logger.info(`Message received: ${JSON.stringify(message)}`);

    // Broadcast message to all clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
    logger.info('Client disconnected');
  });
};
