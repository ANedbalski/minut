class Guest {
    private id: string;
    name: string;
    phone: string;

    constructor(id: string, name: string, phone: string) {
        if (id.length == 0) throw new Error('id canot be empty');
        if (name.length < 3) throw new Error('name must be at least 3 symbols');
        if (phone.length < 3) throw new Error('not valid phone number');
        this.id = id;
        this.name = name;
        this.phone = phone;
    }

    getId = () => this.id;
}

export default Guest;
