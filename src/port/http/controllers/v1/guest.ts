import { Request, Response } from 'express';
import Guest from '../../../../domain/manager/guest';
import Property from '../../../../domain/manager/property';
import { DateRange, Reservation } from '../../../../domain/manager/reservation';
import log from '../../../../utils/logger';
import { CustomRequest } from '../../middleware/auth';

export function makeNewGuest(newGuest: any) {
    return (req: Request, res: Response) => {
        if (!req.body.name || req.body.name.length < 3) {
            return res.status(400).json({ status: 'error', message: 'name parameter must be at least 3 letters' });
        }
        if (!req.body.phone || req.body.phone.length < 3) {
            return res.status(400).json({ status: 'error', message: 'phone parameter must be at least 3 letters' });
        }
        log.info('new guest request');
        newGuest(req.body.name, req.body.phone)
            .then((guest: Guest) => {
                return res.send({
                    id: guest.getId(),
                    name: guest.name,
                    phone: guest.phone,
                    bearer: `xxx.${guest.getId()}.yyy`
                });
            })
            .catch((e: any) => {
                return res.status(404);
            });
    };
}

export function makeEditGuest(getGuest: any, updateGuest: any) {
    return (req: Request, res: Response) => {
        if (!req.body.name || req.body.name.length < 3) {
            return res.status(400).json({ status: 'error', message: 'name parameter must be at least 3 letters' });
        }

        const userId = (req as CustomRequest).userId;
        log.info(`id: ${userId}`);

        getGuest(userId)
            .then((guest: Guest) => {
                return updateGuest(guest, req.body.name, req.body.phone);
            })
            .then((guest: Guest) => {
                return res.status(200).send(guest);
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}

export function makeGetGuest(getGuest: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;

        getGuest(userId)
            .then((mng: Guest) => {
                return res.status(200).send(mng);
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}

export function makeSearchProperties(getGuest: any, searchProperties: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;

        getGuest(userId)
            .then((mng: Guest) => {
                return searchProperties();
            })
            .then((properties: Property[]) => {
                return res.status(200).send(properties);
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}
export function makeViewProperty(getGuest: any, viewProperty: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;

        getGuest(userId)
            .then((mng: Guest) => {
                return viewProperty();
            })
            .then((property: Property) => {
                return res.status(200).send(property);
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}

export function makeBookProperty(getGuest: any, viewProperty: any, bookProperty: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;

        if (!req.body.from) {
            return res.status(400).send({ message: 'date "from" must be set' });
        }
        if (!req.body.to) {
            return res.status(400).send({ message: 'date "to" must be set' });
        }
        var guest: Guest;
        var range: DateRange;
        try {
            const range = new DateRange(new Date(req.body.from), new Date(req.body.to));
        } catch (err) {
            return res.status(400).send({ message: `incorrcet parameters ${err}` });
        }

        getGuest(userId)
            .then((guest: Guest) => {
                return viewProperty(req.params.id);
            })
            .then((property: Property) => {
                return bookProperty(guest, property, range);
            })
            .then((reservation: Reservation) => {
                return res.status(200).send(reservation);
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}

export function makeUnbookProperty(getGuest: any, deleteReservation: any) {
    return (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;

        var guest: Guest;

        getGuest(userId)
            .then((property: Property) => {
                return deleteReservation(guest, req.params.id);
            })
            .then(() => {
                return res.status(200).send('OK');
            })
            .catch((e: any) => {
                return res.status(404).send({ error: `${e}` });
            });
    };
}
