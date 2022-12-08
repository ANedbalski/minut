import { Request, Response } from 'express';
import Manager from '../../../../domain/manager/manager';
import log from '../../../../utils/logger';
import { CustomRequest } from '../../middleware/auth';

export function makeNewManager(newManager: any) {
    return (req: Request, res: Response) => {
        if (!req.body.name || req.body.name.length < 3) {
            return res.status(400).json({ status: 'error', message: 'name parameter must be at least 3 letters' });
        }

        newManager(req.body.name)
            .then((mng: Manager) => {
                return res.send({ id: mng.getId(), name: mng.name, bearer: `xxx.${mng.getId()}.yyy` });
            })
            .catch((e: any) => {
                return res.status(404);
            });
    };
}

export function makeEditManager(updateManager: any, getManager: any) {
    return (req: Request, res: Response) => {
        if (!req.body.name || req.body.name.length < 3) {
            return res.status(400).json({ status: 'error', message: 'name parameter must be at least 3 letters' });
        }

        const userId = (req as CustomRequest).userId;
        var manager: Manager;
        log.info(`id: ${userId}`);

        getManager(userId)
            .then((mng: Manager) => {
                mng.name = req.body.name;
                return updateManager(mng);
            })
            .then(() => {
                return res.status(200).send('OK');
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}

export function makeGetManager(getManager: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;
        var manager: Manager;
        log.info(`id: ${userId}`);

        getManager(userId)
            .then((mng: Manager) => {
                return res.status(200).send(mng);
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}
