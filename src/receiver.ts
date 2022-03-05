import fs from 'fs';
import net from 'net';
import path from 'path';
import { SingleBar } from 'cli-progress';
import extract from 'extract-zip';

import input from './util/input';
import receive from './util/receive';
import { log, textFormat } from './util/text-format';

async function main() {
    
    log('Input your friend\'s server address');
    const [ host, port ] = (await input()).split(':');

    const socket = net.connect({ host, port: +port });

    socket.on('connect', () => log('Connected.'));

    const { name, size } = await receive<IFileInfo>(socket);
    const filePath = path.join('./', name);

    log(`Received <green>${name}</green>`)(`Size: <cyan>${size} bytes</cyan>`);

    const progressBar = new SingleBar({
        format: textFormat(`<green>${name}</green> |<cyan>{bar}</cyan>| [<yellow>{percentage}%</yellow>] | Time left: <magenta>{eta}s</magenta>`),
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
    });

    progressBar.start(size, 0);

    const writer = fs.createWriteStream(filePath);

    socket.on('data', data => {
        progressBar.increment(data.length);
        writer.write(data);
    });

    socket.once('close', async () => {
        progressBar.stop();
        writer.end();
        log('File received.');

        if (!name.endsWith('.zip')) return;

        log('This is an archive. Do you want to unpack it? <cyan>(y/n)</cyan>');
        const unpack = (await input()).toLowerCase() === 'y';

        if (!unpack) return;

        await extract(filePath, { dir: process.cwd() });

        log(`Unpacking. Please, wait...`)

        fs.rmSync(filePath);

        log(`Unpacked.`);
    });

}

main();
