import fs from 'fs';
import net from 'net';

import input from './util/input';
import { log } from './util/text-format';
import getVariable from './variables/get-variable';
import { Constants } from './constants';

async function main() {
    const port = await getVariable('port');

    console.log('Input file path:');

    const filePath = await input();

    const server = net.createServer(socket => {
        log(`Connection from <cyan>${socket.remoteAddress}</cyan>`);

        socket.write(JSON.stringify({
            name: filePath.split(/\/|\\/g).at(-1),
            size: fs.statSync(filePath).size,
        } as IFileInfo));

        fs.createReadStream(filePath)
            .on('end', () => {
                log(`<cyan>${filePath}</cyan> transported.`)(`Disconnecting.`);
                socket.end();
                server.unref();
            })
            .pipe(socket);
    });

    server.listen(port, () => log(`Server is on <cyan>${Constants.IP}:${port}</cyan>. Send this address your friend.`))
}

main();
