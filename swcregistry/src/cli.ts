#!/usr/bin/env node

import { SWC } from "./index";

const [,, ...args] = process.argv;

interface HandlerInterface {
    (...args: string[]): void
}

interface HandlerMapInterface {
    [handler: string]: HandlerInterface;
}

const commands: HandlerMapInterface = {
    "update": (...args: string[]) => {
        const swc: SWC = new SWC('SWC-100');

        swc.update((error: Error | null) => {
            if (error) {
                console.log(error);
            } else {
                console.log('SWC dictionary was successfully updated');
            }
        });
    }
};

const command: string | undefined = args.shift();

if (command && (command in commands)) {
    let handler: (...args: string[]) => void = commands[command];

    commands[command](...args);
} else {
    console.log("List of supported commands: " + Object.keys(commands).join(', '));
}
