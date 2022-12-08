import express, { Request, Response } from 'express';
import http from 'http';
import log from '../../utils/logger';
import { Logger } from 'pino';
import makeV1Routes from './v1routes';

export function serverFactory(serviceDI: any, log: Logger) {
    const server = express();

    server.use(express.json());

    server.get('/api/healthcheck', (req: Request, res: Response) => {
        log.info('healthcheck endpoint');
        return res.status(200).send('OK');
    });

    server.use('/api/v1', makeV1Routes(serviceDI));

    return server;
}
