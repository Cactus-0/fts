import fs from 'fs';
import os from 'os';
import net from 'net';

import input from './util/input';
import { log } from './util/text-format';
import getVariable from './variables/get-variable';
import { Loader } from './loader';

async function main() {
    const port = await getVariable('port');

    console.log('Input file path:');

    const filePath = await input();

    const name = filePath.split(/\/|\\/g).at(-1) ?? 'Undefined_File';
    const size = fs.statSync(filePath).size;

    const loader = new Loader(name, size);

    const server = net.createServer(socket => {
        log(`Connection from <cyan>${socket.remoteAddress}</>`);

        socket.write(JSON.stringify({ name, size } as IFileInfo));

        loader.start();

        fs.createReadStream(filePath)
            .on('end', () => {
                loader.stop();
                log(`<green>${filePath}</> transported.`)(`Disconnecting.`);
                socket.end();
                server.unref();
            })
            .on('data', ({ length }) => loader.appendData(length))
            .pipe(socket);
    });

    server.listen(port, () => {
        log(`\nAvailable addresses`);

        Object.entries(os.networkInterfaces()).forEach(([ name, addresses ], i, { length }) => {
            const { address: ip } = addresses?.at(-1)!;
            log(` ${i + 1 < length ? '├' : '└'} <cyan>${ip}:${port}</> (<grey>${name}</>)`);
        });

        log(`\nSend one of this your friend`);
    });
}

main();
