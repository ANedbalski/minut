import Property from '../../domain/manager/property';
import { Reservation } from '../../domain/manager/reservation';
import { ReservationRepository } from '../../domain/manager/services/property';

export class ReservationInMemory implements ReservationRepository {
    private items: Array<Reservation>;

    constructor() {
        this.items = new Array<Reservation>();
    }

    listPropertyReservations(property: Property): Promise<Reservation[]> {
        return new Promise((resolve, reject) => {
            resolve(this.items.filter((item) => item.propertyId === property.getId()));
        });
    }
}
