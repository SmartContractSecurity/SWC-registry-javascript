#!/usr/bin/env node
import fs = require('fs');
import fetch from 'node-fetch';

const [, , ...args] = process.argv;

interface HandlerInterface {
    (...args: string[]): void;
}

interface HandlerMapInterface {
    [handler: string]: HandlerInterface;
}

const commands: HandlerMapInterface = {
    update: () => {
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
    }
};

const command: string | undefined = args.shift();

if (command && command in commands) {
    const handler = commands[command];

    handler(...args);
} else {
    console.log('List of supported commands: ' + Object.keys(commands).join(', '));
}
