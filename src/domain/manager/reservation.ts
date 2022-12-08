import Guest from './guest';
import Property from './property';

export class DateRange {
    from: Date;
    to: Date;

    constructor(from: Date, to: Date) {
        if (to <= from) throw new Error('from must be before to values');

        this.from = from;
        this.to = to;
    }

    isIntersect(other: DateRange) {
        return (
            (this.from >= other.from && this.from < other.to) ||
            (this.to > other.from && this.to <= other.to) ||
            (other.from >= this.from && other.from < this.to) ||
            (other.to > this.from && other.to <= this.to)
        );
    }
}

export class Reservation {
    private id: string;
    propertyId: string;
    guest: Guest;
    dateRange: DateRange;

    constructor(id: string, property: Property, guest: Guest, dateRange: DateRange) {
        if (!guest) throw new Error('invalid guest');
        if (!property) throw new Error('invalid property');

        this.id = id;
        this.propertyId = property.getId();
        this.guest = guest;
        this.dateRange = dateRange;
    }
}
