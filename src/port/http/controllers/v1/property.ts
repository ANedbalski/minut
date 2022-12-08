import { Request, Response } from 'express';
import Manager from '../../../../domain/manager/manager';
import Property from '../../../../domain/manager/property';
import { Reservation, DateRange } from '../../../../domain/manager/reservation';
import { CustomRequest } from '../../middleware/auth';
import log from '../../../../utils/logger';

export function makeListProperties(getManager: any, listProperties: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;

        getManager(userId)
            .then((mng: Manager) => {
                log.info(`reserve resuest for propertyId: ${req.params.id}`);
                return listProperties(mng);
            })
            .then((properties: Property[]) => {
                return res.status(200).send(properties);
            })
            .catch((e: any) => {
                return res.status(404);
            });
    };
}

export function makeGetProperty(getManager: any, getProperty: any) {
    return (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(404).send('Unknown property');
        }
        const userId = (req as CustomRequest).userId;

        getManager(userId)
            .then((mng: Manager) => {
                log.info(`get property request with id: ${req.params.id}`);
                return getProperty(mng, req.params.id);
            })
            .then((property: Property) => {
                return res.status(200).send(property);
            })
            .catch((e: any) => {
                return res.status(404).send(e);
            });
    };
}

export function makeAddProperty(getManager: any, addProperty: any) {
    return (req: Request, res: Response) => {
        if (!req.body.name || req.body.name.length < 5) {
            return res.status(400).json({ status: 'error', message: 'name parameter must be at least 3 letters' });
        }
        const userId = (req as CustomRequest).userId;

        getManager(userId)
            .then((mng: Manager) => {
                log.info('new property request with: ');
                return addProperty(mng, req.body.name);
            })
            .then((property: Property) => {
                return res.status(200).send(property);
            })
            .catch((e: any) => {
                return res.status(404).send(e);
            });
    };
}
export function makeUpdateProperty(getManager: any, updateProperty: any) {
    return (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(404).send('Id not provided');
        }
        if (!req.body.name || req.body.name.length < 5) {
            return res.status(400).json({ status: 'error', message: 'name parameter must be at least 3 letters' });
        }

        const userId = (req as CustomRequest).userId;
        getManager(userId)
            .then((mng: Manager) => {
                log.info(`new property request with: `);
                return updateProperty(mng, req.params.id, req.body.name);
            })
            .then((property: Property) => {
                return res.status(200).send(property);
            })
            .catch((e: any) => {
                return res.status(404).send(e);
            });
    };
}

export function makeGetReservations(getManager: any, getProperty: any, getReservations: any) {
    return (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(404).send('Id not provided');
        }
        const from = !req.params.from ? new Date() : new Date(req.params.from);
        let to: Date;
        if (!req.params.from) {
            to = new Date();
            to.setMonth(from.getMonth() + 1);
        } else {
            to = new Date(req.params.from);
        }

        if (to < from) {
            return res.status(400).send('incorrect date period');
        }
        const userId = (req as CustomRequest).userId;
        getManager(userId)
            .then((mng: Manager) => {
                log.info(`new property request with: `);
                return getProperty(mng, req.params.id);
            })
            .then((property: Property) => {
                return getReservations(property, new DateRange(from, to));
            })
            .then((reservations: Reservation[]) => {
                return res.status(200).send(reservations);
            })
            .catch((e: any) => {
                return res.status(404).send(e);
            });
    };
}
