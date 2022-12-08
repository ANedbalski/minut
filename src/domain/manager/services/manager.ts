import Manager from '../manager';
import { v4 as uuidv4 } from 'uuid';
import log from '../../../utils/logger';

export interface ManagerRepository {
    get(id: string): Promise<Manager | undefined>;
    add(manager: Manager): Promise<void>;
    update(manager: Manager): Promise<void>;
}

// Factory to create the getManager function with repository injection
export function makeGetManager(repo: ManagerRepository) {
    return function (id: string): Promise<Manager | null | undefined> {
        return new Promise<Manager>((resolve, reject) => {
            repo.get(id)
                .then((res) => {
                    if (!res) {
                        reject(new Error('manager not found'));
                    }
                    resolve(res!);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    };
}

// Factory to create the addManager function with repository injection
export function makeAddManager(repo: ManagerRepository) {
    return function (name: string): Promise<Manager | null | undefined> {
        return new Promise<Manager>((resolve, reject) => {
            const id = uuidv4();
            try {
                const manager = new Manager(id, name);

                repo.add(manager).then(() => {
                    resolve(manager);
                });
            } catch (err) {
                reject(err);
            }
        });
    };
}

export function makeUpdateManager(repo: ManagerRepository) {
    return function (manager: Manager, newName: string): Promise<Manager | null | undefined> {
        return new Promise<Manager>((resolve, reject) => {
            manager.name = newName;
            return repo.update(manager);
        });
    };
}
