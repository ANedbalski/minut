import Guest from '../../domain/manager/guest';
import { GuestRepository } from '../../domain/manager/services/guest';
import log from '../../utils/logger';
import { fixtureGuests } from './fixtures';

export class GuestInMemory implements GuestRepository {
    private items: Array<Guest>;
    constructor() {
        this.items = new Array<Guest>(...fixtureGuests);
    }

    get(id: string): Promise<Guest> {
        return new Promise((resolve, reject) => {
            log.info(`searching user id: ${id}`);
            const i = this.items.findIndex((item) => item.getId() == id);
            if (i < 0) {
                reject(new Error('record not found'));
            }
            resolve(this.items[i]);
        });
    }

    add(guest: Guest) {
        return new Promise<Guest>((resolve, reject) => {
            if (this.items.find((item) => item.getId() === guest.getId())) {
                reject(new Error('guest with this id already exist'));
            }
            this.items.push(guest);
            resolve(guest);
        });
    }

    update(guest: Guest) {
        return new Promise<Guest>((resolve, reject) => {
            const i = this.items.findIndex((item) => item.getId() === guest.getId());
            if (i < 0) {
                reject(new Error("manager with this id doesn't exist"));
            }
            this.items[i] = guest;
            resolve(guest);
        });
    }
}
