import Guest from '../../domain/manager/guest';
import Property from '../../domain/manager/property';
import { DateRange, Reservation } from '../../domain/manager/reservation';
import { ReservationRepository } from '../../domain/manager/services/property';
import log from '../../utils/logger';

export class ReservationInMemory implements ReservationRepository {
    private items: Array<Reservation>;

    constructor() {
        this.items = new Array<Reservation>();
    }

    listPropertyReservations(property: Property, range: DateRange): Promise<Reservation[]> {
        return new Promise((resolve, reject) => {
            log.info(`range ${range}`);
            resolve(
                this.items.filter(
                    (item) =>
                        item.propertyId === property.getId() &&
                        (item.dateRange.to > range.from || item.dateRange.from < range.to)
                )
            );
        });
    }

    add(reservation: Reservation): Promise<Reservation> {
        return new Promise((resolve) => {
            console.log(`adding reservation`, reservation);
            this.items.push(reservation);
            resolve(reservation);
        });
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            log.info(`deleting ${id}`);
            const ind = this.items.findIndex((item) => item.getId() == id);
            if (ind < 0) {
                reject(new Error('reservation not found'));
            }
            this.items.splice(ind, 1);
            resolve();
        });
    }

    get(id: string): Promise<Reservation> {
        return new Promise((resolve, reject) => {
            const ind = this.items.findIndex((item) => item.getId() == id);
            if (ind < 0) {
                reject(new Error('reservation not found'));
            }
            resolve(this.items[ind]);
        });
    }
}
