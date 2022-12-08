import { OperationCanceledException } from 'typescript';
import { makeAddMessage } from './chat';
import { ChatInMemory } from '../../../repository/inmemory/chat';
import { DateRange } from '../reservation';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

// Then either:
var expect = chai.expect;
// or:
var assert = chai.assert;

describe('addMessage', () => {
    it('reject if from parameter missed', () => {
        const func = makeAddMessage(new ChatInMemory());
        expect(func('', 'recepient', 'message')).to.be.rejected;
    });
    it('reject if to parameter missed', () => {
        const func = makeAddMessage(new ChatInMemory());
        expect(func('author', '', 'message')).to.be.rejected;
    });
    it('reject if message parameter missed', () => {
        const func = makeAddMessage(new ChatInMemory());
        expect(func('author', 'recepient', '')).to.be.rejected;
    });
    it('saves data to db, if data valid', () => {
        const func = makeAddMessage(new ChatInMemory());
        expect(func('author', 'recepient', 'message')).to.be.fulfilled;
    });
});
