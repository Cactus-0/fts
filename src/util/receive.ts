import { Socket } from 'net';

export default function receive<T = any>(socket: Socket): Promise<T> {
    return new Promise<T>(resolve => {
        socket.once('data', message => {
            resolve(JSON.parse(message.toString('utf-8')));
        });
    });
}
