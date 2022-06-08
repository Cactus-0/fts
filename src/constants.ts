import path from 'path';

export namespace Constants {
    export const CONFIG_FILE_NAME = 'fts-config.json';
    export const CONFIG_FILE_PATH = path.join(__dirname, Constants.CONFIG_FILE_NAME);
}
