import JSONFile from './json-file';
import { Constants } from '../constants';
import input from '../util/input';

const configFile = new JSONFile<IConfig>(Constants.CONFIG_FILE_PATH);

configFile.load({});

export default async function getVariable(name: keyof IConfig, message: string = 'Please, enter a [var]:'): Promise<string> {
    if (configFile.data?.[name])
        return configFile.data?.[name]!;

    console.log(message.replaceAll('[var]', name));

    const result = await input();

    configFile.data![name] = result;
    configFile.save();

    return result;
}
