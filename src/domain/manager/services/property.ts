import Manager from '../manager';
import Property from '../property';
import Guest from '../guest';
import { Reservation, DateRange } from '../reservation';
import log from '../../../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export interface PropertyRepository {
    get(id: string): Promise<Property | undefined>;
    listOwnerProperties(owner: Manager): Promise<Property[]>;
    add(property: Property): Promise<void>;
    update(property: Property): Promise<void>;
    searchProperties(search?: string): Promise<Property[]>;
}

export interface ReservationRepository {
    listPropertyReservations(property: Property, range: DateRange): Promise<Reservation[]>;
    add(reservation: Reservation): Promise<Reservation>;
    delete(id: string): Promise<void>;
}

export function makeGetProperty(repo: PropertyRepository) {
    return function (manager: Manager, id: string): Promise<Property | null | undefined> {
        return new Promise<Property>((resolve, reject) => {
            repo.get(id).then((res) => {
                if (!res || !res.isOwner(manager)) {
                    reject(new Error('property not found'));
                }
                resolve(res!);
            });
        });
    };
}

export function makeUpdateProperty(repo: PropertyRepository) {
    return function (manager: Manager, propertyId: string, name: string): Promise<Property> {
        return new Promise<Property>((resolve, reject) => {
            repo.get(propertyId).then((property) => {
                if (!property || !property.isOwner(manager)) {
                    reject(new Error('access restricted'));
                }
                log.info(`updating property id: ${property}`);
                property!.name = name;
                repo.update(property!)
                    .then(() => {
                        resolve(property!);
                    })
                    .catch((e) => {
                        log.info(`error updating property: ${e}`);
                        reject(e);
                    });
            });
        });
    };
}

export function makeAddProperty(repo: PropertyRepository) {
    return function (manager: Manager, name: string): Promise<Property> {
        return new Promise<Property>((resolve, reject) => {
            log.info('creating new property');
            const id = uuidv4();
            try {
                const property = new Property(id, name, manager);
                repo.add(property).then(() => {
                    resolve(property);
                });
            } catch (err) {
                reject(err);
            }
        });
    };
}

export function makeGetPropertyReservations(repo: ReservationRepository) {
    return (manager: Manager, property: Property, range: DateRange) => {
        return new Promise<Reservation[]>((resolve, reject) => {
            if (!property.isOwner(manager)) reject(new Error('manager is not owner of property'));

            repo.listPropertyReservations(property, range);
        });
    };
}

// function to retrieve list of properties owned by manager
export function makeListProperties(repo: PropertyRepository) {
    return function (manager: Manager): Promise<Property[]> {
        return repo.listOwnerProperties(manager);
    };
}

// function to retrieve list of properties to book for guests
export function makeSearchProperties(repo: PropertyRepository) {
    return function (search: string) {
        return new Promise<Reservation>((resolve, reject) => {
            return repo.searchProperties(search);
        });
    };
}

// function to retrieve a properties to book for guests
export function makeViewProperty(repo: PropertyRepository) {
    return function (id: string) {
        return new Promise<Reservation>((resolve, reject) => {
            return repo.get(id);
        });
    };
}

// function to retrieve list of properties to book for guests
export function makeBookProperty(repo: ReservationRepository) {
    return function (guest: Guest, property: Property, range: DateRange) {
        return new Promise<Reservation>((resolve, reject) => {
            const id = uuidv4();
            repo.listPropertyReservations(property, range)
                .then((reservations: Reservation[]) => {
                    if (reservations.length > 0) {
                        reject(new Error('property is not available at choosed dates'));
                    }
                    return repo.add(new Reservation(id, property, guest, range));
                })
                .then((reservation: Reservation) => {
                    resolve(reservation);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    };
}

// function to retrieve list of properties to book for guests
export function makeUnbookProperty(repo: ReservationRepository) {
    return function (id: string) {
        return new Promise<Reservation>((resolve, reject) => {
            return repo.delete(id);
        });
    };
}
