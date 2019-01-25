#!/usr/bin/env node

import fs = require("fs");
import fetch from "node-fetch";

const rawdata = require('./swc-definition.json');

class SWC {
    private SWCID: string;
    private rawdata: JSON;

    constructor(SWCID: string) {
        this.SWCID = SWCID;
        this.rawdata = rawdata;
    }

    private updateFileContent(content: JSON, done: (error: Error | null) => void): void {
        this.rawdata = content;

        fs.writeFile('swc-definition.json', JSON.stringify(content), (err?: Error) => {
            if (err) {
                console.error(err);
                done(err);
            } else {
                done(null);
            }
        });
    }

    public update(done: (error: Error | null) => void): void {
        const url: string = 'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json';

        fetch(url)
          .then((response: any) => response.json())
          .then((content: JSON) => this.updateFileContent(content, done))
          .catch((error: Error) => done(error));
    }

    private entry(): any {
        return (this.rawdata as any)[this.SWCID];
    }

    public title(): string | null {
        const entry = this.entry();

        return entry ? entry['content']['Title'] : null;
    }

    public relationships(): string | null {
        const entry = this.entry();

        return entry ? entry['content']['Relationships'] : null;
    }

    public description(): string | null {
        const entry = this.entry();

        return entry ? entry['content']['Description'] : null;
    }

    public remediation(): string | null {
        const entry = this.entry();

        return entry ? entry['content']['Remediation'] : null;
    }
}

export { SWC };
