import fs from 'fs';
import net from 'net';
import path from 'path';
import extract from 'extract-zip';

import input from './util/input';
import receive from './util/receive';
import { log } from './util/text-format';
import { Loader } from './loader';

async function main() {
    
    log('Input your friend\'s server address');
    const [ host, port ] = (await input()).split(':');

    const socket = net.connect({ host, port: +port });

    socket.on('connect', () => log('Connected.'));

    const { name, size } = await receive<IFileInfo>(socket);
    const filePath = path.join('./', name);

    const loader = new Loader(name, size);

    loader.start();

    const writeStream = fs.createWriteStream(filePath);

    socket.on('data', data => {
        loader.appendData(data.length);
        writeStream.write(data);
    });

    socket.once('close', async () => {
        loader.stop();
        writeStream.end();

        log('File received.');

        if (!name.endsWith('.zip')) return;

        log('This is an archive. Do you want to unpack it? <cyan>(y/n)</>');
        const unpack = (await input()).toLowerCase() === 'y';

        if (!unpack) return;

        await extract(filePath, { dir: process.cwd() });

        log(`Unpacking. Please, wait...`);
        fs.rmSync(filePath);
        log(`Unpacked.`);
    });

}

main();
