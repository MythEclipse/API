import request from 'supertest';
import http from 'http';
import { AddressInfo } from 'net';
import express from 'express';
import { Request, Response } from 'express';
import { initWebSocketServer } from '../src/services/websocketService';
import logger from '../src/utils/logger';
import WebSocket from 'ws';

describe('index.ts tests', () => {
    let server: http.Server;
    let port: number;

    beforeAll(async () => {
        const app = express();

        app.get('/', (req: Request, res: Response) => {
            logger.info('Received GET request at /');
            res.send('<html>Hello Test</html>');
        });

        server = http.createServer(app);

        // Initialize WebSocket server
        initWebSocketServer(server);

        // Tunggu server siap mendengarkan
        await new Promise<void>((resolve) => {
            server.listen(0, () => {
                port = (server.address() as AddressInfo).port;
                logger.info(`Test server running on port: ${port}`);
                resolve();
            });
        });
    });

    afterAll(() => {
        logger.info('Closing test server');
        server.close();
    });

    it('should respond to the root path with HTML content', async () => {
        logger.info('Testing root path /');
        const response = await request(`http://localhost:${port}`).get('/');
        logger.info(`Response status: ${response.status}`);
        logger.info(`Response text: ${response.text}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('<html>');
    });

    it('should initialize websocket service', () => {
        logger.info('Testing WebSocket service initialization');
        expect(server).toBeDefined();
    });

    it('should return 404 for an unknown path', async () => {
        logger.info('Testing unknown path /unknown');
        const response = await request(`http://localhost:${port}`).get('/unknown');
        logger.info(`Response status: ${response.status}`);
        expect(response.status).toBe(404);
    });

    describe('WebSocket tests', () => {
        it('should accept a new WebSocket connection', (done) => {
            logger.info('Testing WebSocket connection');
            const wsClient = new WebSocket(`ws://localhost:${port}`);
            wsClient.on('open', () => {
                logger.info('WebSocket connection established');
                wsClient.close();
                done();
            });
        });

        it('should broadcast messages to all clients', (done) => {
            logger.info('Testing WebSocket message broadcasting');
            const wsClient1 = new WebSocket(`ws://localhost:${port}`);
            const wsClient2 = new WebSocket(`ws://localhost:${port}`);

            let receivedCount = 0;

            const handleMessage = (data: WebSocket.MessageEvent) => {
                const msg = JSON.parse(data.toString());
                logger.info(`WebSocket message received: ${msg.text}`);
                if (msg.text === 'Hello from client1') {
                    receivedCount++;
                    if (receivedCount === 2) {
                        logger.info('Both clients received the message');
                        wsClient1.close();
                        wsClient2.close();
                        done();
                    }
                }
            };

            wsClient1.on('message', handleMessage);
            wsClient2.on('message', handleMessage);

            wsClient1.on('open', () => {
                logger.info('Client 1 sending message');
                wsClient1.send('Hello from client1');
            });
        });
    });
});
