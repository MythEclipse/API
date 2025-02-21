import { Application } from 'express';

export function setChatRoutes(app: Application) {
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
}

