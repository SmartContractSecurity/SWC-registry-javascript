#!/usr/bin/env node
import fse from 'fs-extra';
import axios from 'axios';
import { SWC } from '.';

const [, , ...args] = process.argv;

interface HandlerInterface {
    (...args: Array<string | undefined>): void;
}

interface HandlerMapInterface {
    [handler: string]: HandlerInterface;
}

const handlers: HandlerMapInterface = {
    '--update': async () => {
        const response = await axios({
            method: 'GET',

            url: 'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json',

            responseType: 'json'
        });

        await fse.writeFile(__dirname + '/swc-definition.json', JSON.stringify(response.data));

        console.log('SWC dictionary was successfully updated');
    },

    '--markdown': id => {
        if (id === undefined) {
            console.log('Specify valid SWC entry ID');
        } else {
            const swc = new SWC();
            const doc = swc.getEntryMarkDown(id);

            console.log(doc ? doc : `No SWC entry found for ID "${id}"`);
        }
    },

    '--help': () => {
        const message = [
            'Javascript library for accessing SWC-registry entries.',
            '',
            'Options:',
            '  --help           Prints this message.',
            '  --update         Downloads the latest version of the SWC-registry JSON snapshot.',
            '  --markdown <id>  Prints markdown of SWC with specified ID.'
        ].join('\n');

        console.log(message);
    }
};

const option = args.shift() || '--help';

if (option in handlers) {
    handlers[option](...args);
} else {
    console.log('List of supported options: ' + Object.keys(handlers).join(', '));
}
