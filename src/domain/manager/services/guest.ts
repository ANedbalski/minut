import Guest from '../guest';
import { v4 as uuidv4 } from 'uuid';
import log from '../../../utils/logger';

export interface GuestRepository {
    get(id: string): Promise<Guest>;
    add(guest: Guest): Promise<Guest>;
    update(guest: Guest): Promise<Guest>;
}

// Factory to create the getManager function with repository injection
export function makeGetGuest(repo: GuestRepository) {
    return function (id: string): Promise<Guest> {
        return new Promise<Guest>((resolve, reject) => {
            repo.get(id)
                .then((res) => {
                    if (!res) {
                        log.info('guest not found');
                        reject(new Error('guest not found'));
                    }
                    resolve(res!);
                })
                .catch((e) => {
                    log.error(`errro finding guest: ${e}`);
                    reject(e);
                });
        });
    };
}

// Factory to create the addManager function with repository injection
export function makeAddGuest(repo: GuestRepository) {
    return function (name: string, phone: string): Promise<Guest> {
        return new Promise<Guest>((resolve, reject) => {
            const id = uuidv4();
            log.info(`adding new guest ${id}`);
            try {
                const guest = new Guest(id, name, phone);
                repo.add(guest)
                    .then(() => {
                        resolve(guest);
                    })
                    .catch((e: any) => {
                        reject(e);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };
}

export function makeUpdateGuest(repo: GuestRepository) {
    return function (guest: Guest, newName?: string, newPhone?: string): Promise<Guest> {
        return new Promise<Guest>((resolve, reject) => {
            if (newName) {
                guest.name = newName;
            }
            if (newPhone) {
                guest.phone = newPhone;
            }
            repo.update(guest)
                .then(() => {
                    resolve(guest);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    };
}
