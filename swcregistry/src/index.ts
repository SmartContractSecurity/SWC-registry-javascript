#!/usr/bin/env node
import { XMLHttpRequest } from 'xmlhttprequest-ts';

import fs = require('fs');
import fetch = require('node-fetch');
import path = require('path');

const dirString = path.dirname(fs.realpathSync(__filename));


class SWC {
    /*
    SWC class contains information on an SWC entry

    Example usage:
        swc = new SWC('SWC-100')
        console.log(swc.title)
    If you need a latest version of swc-definition.json file, use:
        const swc = new SWC('SWC-100');
        swc.update(err => {
            if(err) {
                console.log(err);
            } else {
                console.log(swc.title());
            }
        });
    */
    private SWCID: string;
    constructor(SWCID) {
        this.SWCID = SWCID;
    }

    public update_file_content(content, done){
        fs.writeFile('swc-definition.json', JSON.stringify(content), (err) => {
            if (err) {
                console.error(err);
                done(err);
                return;
            }
            done(null)
            return;
        });
    }

    public update(done){
        const url = 'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json';
        return fetch(url)
            .then(res => res.json())
            .then(res => this.update_file_content(res, done))
            .catch(err => done(err));
    }

    public content(){
        const file = fs.readFileSync(dirString + '/swc-definition.json');
        const rawdata = JSON.parse(file.toString());
        if (rawdata[this.SWCID] === undefined){
            console.log(`SWC with ID ${this.SWCID} does not exist`);
            return {}
        }
        return rawdata[this.SWCID]['content'];
    }

    public title() {
        return this.content()['Title'];
    }
    public relationships(){
        return this.content()['Relationships']
    }
    public description(){
        return this.content()['Description']
    }
    public remediation(){
        return this.content()['Remediation']
    }
}
export { SWC };
