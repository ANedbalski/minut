import { v4 as uuidv4 } from 'uuid';

export default class Message {
    private id: string;
    from: string;
    to: string;
    message: string;
    createdAt: Date;

    constructor(from: string, to: string, message: string) {
        this.id = uuidv4();
        this.from = from;
        this.to = to;
        this.message = message;
        this.createdAt = new Date();
    }
}
