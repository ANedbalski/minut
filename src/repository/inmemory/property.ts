import Property from '../../domain/manager/property';
import Manager from '../../domain/manager/manager';
import { PropertyRepository } from '../../domain/manager/services/property';
import { fixtureProperties } from './fixtures';
import log from '../../utils/logger';

export class PropertyInMemory implements PropertyRepository {
    private items: Array<Property>;
    constructor() {
        this.items = new Array<Property>(...fixtureProperties);
    }

    get(id: string): Promise<Property> {
        return new Promise((resolve, reject) => {
            log.info(`searching property id: ${id}`);
            const ind = this.items.findIndex((item) => item.getId() == id);
            log.info(`found index ${ind}`);
            if (ind < 0) {
                reject('property not found');
            }
            resolve(this.items[ind]);
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
            if (!search) {
                resolve(this.items);
            }
            resolve(this.items.filter((item) => reg.test(item.name)));
        });
    }
}
