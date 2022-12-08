import Property from '../../domain/manager/property';
import Manager from '../../domain/manager/manager';
import { PropertyRepository } from '../../domain/manager/services/property';
import { fixtureProperties } from './fixtures';

export class PropertyInMemory implements PropertyRepository {
    private items: Array<Property>;
    constructor() {
        this.items = new Array<Property>(...fixtureProperties);
    }

    get(id: string): Promise<Property | undefined> {
        return new Promise((resolve) => {
            resolve(this.items.find((item) => item.getId() === id));
        });
    }

    add(property: Property) {
        return new Promise<void>((resolve, reject) => {
            if (this.items.find((item) => item.getId() === property.getId())) {
                reject(new Error('property with this id already exist'));
            }
            this.items.push(property);
            resolve();
        });
    }

    update(property: Property) {
        return new Promise<void>((resolve, reject) => {
            const i = this.items.findIndex((item) => item.getId() == property.getId());
            if (i < 0) {
                reject(new Error(`property with id: ${property.getId()} doesn't exist`));
            }
            this.items[i] = property;
            resolve();
        });
    }

    listOwnerProperties(owner: Manager) {
        return new Promise<Property[]>((resolve) => {
            resolve(this.items.filter((item) => item.manager.getId() == owner.getId()));
        });
    }

    searchProperties(search?: string): Promise<Property[]> {
        const reg = new RegExp(`/.*${search}/.*`);
        return new Promise<Property[]>((resolve) => {
            resolve(this.items.filter((item) => reg.test(item.name)));
        });
    }
}
