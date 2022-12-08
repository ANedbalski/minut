import config from './config/config';
import { serverFactory } from './port/http/server';
import { makeGetPropertyReservations } from './domain/manager/services/reservation';

import { ReservationInMemory } from './repository/inmemory/reservation';
import log from './utils/logger';
import {
    makeGetProperty,
    makeListProperties,
    makeAddProperty,
    makeUpdateProperty,
    makeSearchProperties,
    makeViewProperty,
    makeBookProperty,
    makeUnbookProperty
} from './domain/manager/services/property';
import { makeGetManager, makeUpdateManager, makeAddManager } from './domain/manager/services/manager';
import { makeGetGuest, makeUpdateGuest, makeAddGuest } from './domain/manager/services/guest';
import { ManagerInMemory } from './repository/inmemory/manager';
import { PropertyInMemory } from './repository/inmemory/property';
import { GuestInMemory } from './repository/inmemory/guest';

log.info('initialize modules');
//initialize repositories
const reservationRepo = new ReservationInMemory();
const managerRepo = new ManagerInMemory();
const guestRepo = new GuestInMemory();
const propertyRepo = new PropertyInMemory();

// struct used to hold all serice implmentations to inject to the controllers
const serviceDI = {
    //Manager service
    getManager: makeGetManager(managerRepo),
    addManager: makeAddManager(managerRepo),
    updateManager: makeUpdateManager(managerRepo),

    //Manage proeprties services
    listProperties: makeListProperties(propertyRepo),
    getProperty: makeGetProperty(propertyRepo),
    addProperty: makeAddProperty(propertyRepo),
    updateProperty: makeUpdateProperty(propertyRepo),
    getReservations: makeGetPropertyReservations(reservationRepo),

    //guests serviceDI
    getGuest: makeGetGuest(guestRepo),
    addGuest: makeAddGuest(guestRepo),
    updateGuest: makeUpdateGuest(guestRepo),
    searchProperties: makeSearchProperties(propertyRepo),
    viewProperty: makeViewProperty(propertyRepo),
    bookProperty: makeBookProperty(propertyRepo),
    unbookProperty: makeUnbookProperty(propertyRepo)
};

const http = serverFactory(serviceDI, log.child({ module: 'http' }));

http.listen(config.server.http.port, () => {
    log.info('server started');
});
