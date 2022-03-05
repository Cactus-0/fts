import fs from 'fs';

export default class JSONFile<T> {
    public data?: T;

    constructor(
        private readonly _path: string
    ) { }

    public load(defaultValue?: T): void {
        if (!fs.existsSync(this._path))
            this.data = defaultValue;
        else
            this.data = JSON.parse(fs.readFileSync(this._path, { encoding: 'utf-8' })) || defaultValue;
    }

    public save(): void {
        fs.writeFileSync(this._path, JSON.stringify(this.data), { encoding: 'utf-8' });
    }
}
