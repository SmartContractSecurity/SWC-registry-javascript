#!/usr/bin/env node
import fs = require('fs');
import fetch from 'node-fetch';
import { SWC } from '.';

const [,, ...args] = process.argv;

interface HandlerInterface {
    (...args: (string | undefined)[]): void;
}

interface HandlerMapInterface {
    [handler: string]: HandlerInterface;
}

const commands: HandlerMapInterface = {
    "--update": () => {
        const url =
            'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json';

        const fileName = __dirname + '/swc-definition.json';
        const callback = (error?: Error) => {
            console.log(error ? error : 'SWC dictionary was successfully updated');
        };

        fetch(url)
            .then(response => response.json())
            .then(content => fs.writeFile(fileName, JSON.stringify(content), callback))
            .catch(error => callback(error));
    },

    "--markdown": id => {
        if (id === undefined) {
            console.log("Specify valid SWC entry ID");
        } else {
            const swc = new SWC();
            const doc = swc.getEntryMarkDown(id);

            console.log(doc ? doc : `No SWC entry found for ID "${id}"`);
        }
    },

    "--help": () => {
        const message = [
            'Javascript library for accessing SWC-registry entries.',
            '',
            'Options:',
            '  --update         Downloads the latest version of the SWC-registry JSON snapshot.',
            '  --markdown <id>  Prints markdown of SWC with specified ID.'
        ].join('\n');

        console.log(message);
    }
};

const command = args.shift() || '--help';

if (command in commands) {
    const handler = commands[command];

    handler(...args);
} else {
    console.log('List of supported options: ' + Object.keys(commands).join(', '));
}
