import Guest from '../../domain/manager/guest';
import Property from '../../domain/manager/property';
import { DateRange, Reservation } from '../../domain/manager/reservation';
import { ReservationRepository } from '../../domain/manager/services/property';

export class ReservationInMemory implements ReservationRepository {
    private items: Array<Reservation>;

    constructor() {
        this.items = new Array<Reservation>();
    }

    listPropertyReservations(property: Property, range: DateRange): Promise<Reservation[]> {
        return new Promise((resolve, reject) => {
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
            this.items.push(reservation);
            resolve(reservation);
        });
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve) => {
            this.items = this.items.filter((item) => item.getId() != id);
            resolve();
        });
    }
}
