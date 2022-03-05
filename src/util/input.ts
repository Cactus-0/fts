import { createInterface } from 'readline';

export default async function input(): Promise<string> {
    return new Promise<string>(resolve => {
        const rl = createInterface(process.stdin);
        
        rl.once('line', line => {
            resolve(line);
            rl.close();
        });
    });
}
