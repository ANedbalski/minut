import Property from '../../domain/manager/property';
import Manager from '../../domain/manager/manager';
import Guest from '../../domain/manager/guest';

export const fixtureManagers: Manager[] = [
    new Manager('53f67500-2f30-468f-9cdc-1a42854b216c', 'John Dow'),
    new Manager('a0ca8ada-4afd-4fa5-be2f-7d64714f18cb', 'Home Owner')
];

export const fixtureProperties: Property[] = [
    new Property('5656', '1st street 1-505', fixtureManagers[0]),
    new Property('5657', '1st street 1-505', fixtureManagers[0]),
    new Property('5658', '1st street 1-505', fixtureManagers[0]),
    new Property('5659', '1st street 1-505', fixtureManagers[1])
];

export const fixtureGuests: Guest[] = [
    new Guest('53f67500-2f30-468f-9cdc-1a4285432434', 'Guest 1', '555-666-777'),
    new Guest('a0ca8ada-4afd-4fa5-be2f-7d64743423443', 'Guest 2', '111-222-333')
];
