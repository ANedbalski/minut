import { CustomRequest } from '../../middleware/auth';
import { Request, Response } from 'express';
import log from '../../../../utils/logger';
import Message from '../../../../domain/manager/message';

export function makeAddMessage(addMessage: any) {
    return (req: Request, res: Response) => {
        if (!req.body.message) {
            return res.status(400).json({ status: 'error', message: "message can't be empty" });
        }
        const userId = (req as CustomRequest).userId;
        log.info('new message request');

        addMessage(userId, req.params.userId, req.body.message)
            .then(() => {
                return res.send('OK');
            })
            .catch((e: any) => {
                return res.status(404);
            });
    };
}

export function makeGetConversation(getConversation: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;
        log.info('new message request');

        getConversation(userId, req.params.userId)
            .then((msgs: Message[]) => {
                return res.send(msgs);
            })
            .catch((e: any) => {
                return res.status(404);
            });
    };
}
