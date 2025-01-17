import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { initWebSocketServer } from './services/websocketService';
import logger from './utils/logger';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send(`
    <html>
      <body>
        <script>
          const ws = new WebSocket('ws://' + window.location.host);
          ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const div = document.createElement('div');
            div.textContent = message.user + ': ' + message.text;
            document.body.appendChild(div);
          };

          document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              const input = document.querySelector('input');
              if (input && input.value.trim()) {
                ws.send(input.value);
                input.value = '';
              }
            }
          });

          document.body.innerHTML = '<input placeholder="Type a message...">';
        </script>
      </body>
    </html>
  `);
});

// Initialize WebSocket server
initWebSocketServer(server);

// Start HTTP server
server.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
