import Manager from '../../domain/manager/manager';
import { ManagerRepository } from '../../domain/manager/services/manager';
import { fixtureManagers } from './fixtures';

export class ManagerInMemory implements ManagerRepository {
    private items: Array<Manager>;
    constructor() {
        this.items = new Array<Manager>(...fixtureManagers);
    }

    get(id: string): Promise<Manager | undefined> {
        return new Promise((resolve) => {
            resolve(this.items.find((item) => item.getId() === id));
        });
    }

    add(manager: Manager) {
        return new Promise<void>((resolve, reject) => {
            if (this.items.find((item) => item.getId() === manager.getId())) {
                reject(new Error('manager with this id already exist'));
            }
            this.items.push(manager);
            resolve();
        });
    }

    update(manager: Manager) {
        return new Promise<void>((resolve, reject) => {
            const i = this.items.findIndex((item) => item.getId() === manager.getId());
            if (i < 0) {
                reject(new Error("manager with this id doesn't exist"));
            }
            this.items[i] = manager;
            resolve();
        });
    }
}
