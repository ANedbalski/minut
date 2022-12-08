import express from 'express';
import { auth } from './middleware/auth';
import {
    makeListProperties,
    makeGetProperty,
    makeAddProperty,
    makeUpdateProperty,
    makeGetReservations
} from './controllers/v1/property';
import { makeNewManager, makeEditManager, makeGetManager } from './controllers/v1/manager';
import {
    makeNewGuest,
    makeEditGuest,
    makeGetGuest,
    makeSearchProperties,
    makeViewProperty,
    makeBookProperty,
    makeUnbookProperty
} from './controllers/v1/guest';
import { makeGetConversation, makeAddMessage } from './controllers/v1/chat';

export default function makeV1Routes(di: any) {
    let apiV1 = express.Router();

    //Manager CRUD API
    //delete not implemented
    apiV1.post('/manager', makeNewManager(di.addManager));
    apiV1.get('/manager', auth, makeGetManager(di.getManager));
    apiV1.put('/manager', auth, makeEditManager(di.updateManager, di.getManager));

    //Property Management
    apiV1.get('/property', auth, makeListProperties(di.getManager, di.listProperties));
    apiV1.post('/property', auth, makeAddProperty(di.getManager, di.addProperty));
    apiV1.get('/property/:id', auth, makeGetProperty(di.getManager, di.getProperty));
    apiV1.put('/property/:id', auth, makeUpdateProperty(di.getManager, di.updateProperty));
    apiV1.get(
        '/property/:id/reservations/:from?/:to?',
        auth,
        makeGetReservations(di.getManager, di.getProperty, di.getReservations)
    );

    //Guest API
    //Guest CRUD
    apiV1.post('/guest', makeNewGuest(di.addGuest));
    apiV1.get('/guest', auth, makeGetGuest(di.getGuest));
    apiV1.put('/guest', auth, makeEditGuest(di.getGuest, di.updateGuest));
    apiV1.get('/list', auth, makeSearchProperties(di.getGuest, di.searchProperties));

    // guest reservations API
    apiV1.get('/list/:propertyId', auth, makeViewProperty(di.getGuest, di.viewProperty));
    apiV1.put('/list/:propertyId/book', auth, makeBookProperty(di.getGuest, di.viewProperty, di.bookProperty));
    apiV1.delete('/booking/:bookId', auth, makeUnbookProperty(di.getGuest, di.unbookProperty));

    // chat API
    apiV1.get('/chat/:userId', auth, makeGetConversation(di.getConversation));
    apiV1.post('/chat/:userId', auth, makeAddMessage(di.addMessage));

    return apiV1;
}
