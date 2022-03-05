import path from 'path';
import { address } from 'ip';

export namespace Constants {
    export const CONFIG_FILE_NAME = 'fts-config.json';
    export const CONFIG_FILE_PATH = path.join(__dirname, Constants.CONFIG_FILE_NAME);
    export const IP = address();
}
