import Message from '../message';

export interface ChatRepository {
    add(message: Message): Promise<void>;
    getConversation(user1: string, user2: string): Promise<Message[]>;
}

//Factory function. creates handler getConversations with repository injection
export function makeGetConversation(repo: ChatRepository) {
    return function (userId: string, recepientId: string): Promise<Message[]> {
        return new Promise<Message[]>((resolve, reject) => {
            repo.getConversation(userId, recepientId)
                .then((msg: Message[]) => {
                    resolve(msg);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    };
}

//Factory function. creates handler AddMessage with repository injection
export function makeAddMessage(repo: ChatRepository) {
    return function (from: string, to: string, message: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const msg = new Message(from, to, message);
            repo.add(msg)
                .then(() => {
                    resolve();
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    };
}
