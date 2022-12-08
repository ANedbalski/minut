import Message from '../../domain/manager/message';

export class ChatInMemory {
    private items: Array<Message>;

    constructor() {
        this.items = new Array<Message>();
    }
    getConversation(user1: string, user2: string) {
        return new Promise<Message[]>((resolve, reject) => {
            resolve(
                this.items
                    .filter(
                        (item) => (item.from == user1 && item.to == user2) || (item.from == user2 && item.to == user1)
                    )
                    .sort((i1, i2) => i1.createdAt.getTime() - i2.createdAt.getTime())
            );
        });
    }

    add(msg: Message) {
        return new Promise<void>((resolve, reject) => {
            this.items.push(msg);
            resolve();
        });
    }
}
