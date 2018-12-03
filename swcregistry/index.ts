#!/usr/bin/env node
import { XMLHttpRequest } from 'xmlhttprequest-ts';

const fs = require("fs");
const fetch = require('node-fetch')


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
    swc_id: string;
    constructor(swc_id) {
        this.swc_id = swc_id;
    }

    public static update_file_content(content, done){
        fs.writeFile("./swc-definition.json", JSON.stringify(content), (err) => {
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
            .then(res => SWC.update_file_content(res, done))
            .catch(err => done(err));
    }

    public content(){
        const rawdata = JSON.parse(fs.readFileSync('./swc-definition.json'));  
        if (rawdata[this.swc_id] == undefined){
            console.log(`SWC with ID ${this.swc_id} does not exist`);
            return {}
        }
        return rawdata[this.swc_id]['content'];
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
