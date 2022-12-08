import Manager from './manager';

class Property {
    private id: string;
    name: string;
    manager: Manager;

    constructor(id: string, name: string, manager: Manager) {
        this.id = id;
        this.name = name;
        this.manager = manager;
    }

    getId = () => this.id;

    isOwner = (manager: Manager) => this.manager.getId() == manager.getId();
}

export default Property;
