import { DateRange } from './reservation';
import { expect } from 'chai';

describe('DateRange constructor', () => {
    it('throw exception when to before from', () => {
        expect(() => {
            new DateRange(new Date('2022-12-03'), new Date('2022-12-01'));
        }).to.throw('from must be before to values');
    });
});

describe('DateRange isIntersect', () => {
    it('should retunt false when 1st rnge', () => {
        const first = new DateRange(new Date('2022-12-01'), new Date('2022-12-03'));
        const second = new DateRange(new Date('2022-12-05'), new Date('2022-12-07'));
        expect(first.isIntersect(second)).to.false;
    });
    it('true when ranges intersects', () => {
        const first = new DateRange(new Date('2022-12-01'), new Date('2022-12-03'));
        const second = new DateRange(new Date('2022-12-02'), new Date('2022-12-07'));
        expect(first.isIntersect(second)).to.true;
    });
    it('false when ranges following 1st-2nd', () => {
        const first = new DateRange(new Date('2022-12-01'), new Date('2022-12-03'));
        const second = new DateRange(new Date('2022-12-03'), new Date('2022-12-07'));
        expect(first.isIntersect(second)).to.false;
    });
    it('false when ranges following 2nd - 1st', () => {
        const first = new DateRange(new Date('2022-12-01'), new Date('2022-12-03'));
        const second = new DateRange(new Date('2022-11-25'), new Date('2022-12-01'));
        expect(first.isIntersect(second)).to.false;
    });
    it('true when 2nd range inside 1st', () => {
        const first = new DateRange(new Date('2022-12-01'), new Date('2022-12-07'));
        const second = new DateRange(new Date('2022-12-02'), new Date('2022-12-03'));
        expect(first.isIntersect(second)).to.true;
    });
    it('true when 1st range inside 2nd', () => {
        const first = new DateRange(new Date('2022-12-02'), new Date('2022-12-03'));
        const second = new DateRange(new Date('2022-12-01'), new Date('2022-12-07'));
        expect(first.isIntersect(second)).to.true;
    });
});
