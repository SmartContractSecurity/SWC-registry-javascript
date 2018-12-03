#!/usr/bin/env node
import { XMLHttpRequest } from 'xmlhttprequest-ts';

const fs = require("fs");
const fetch = require('node-fetch')
const file_definition = require('./swc-definition.json');

class SWCRegistry {
    public update_file_content(content){
        fs.writeFile("./swc-definition.json", JSON.stringify(content), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            return;
        });
    }

    public get_latest_version(){
        const url = 'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json';
        fetch(url)
            .then(res => res.json())
            .then(res => {
              this.update_file_content(res);
              return;
            })
            .catch(res => {
                throw new Error(res.statusText)
        });
    }
    public get_content_by_file(){
        return file_definition;
    }
}


class SWC {
    /*
    SWC class contains information on an SWC entry

    Example usage:
        swc = new SWC('SWC-100')
        console.log(swc.title)
    If you need a latest version of swc-definition.json file, use:
        swc = new SWC('SWC-100')
        swc.get_latest_version()
        console.log(swc.title)
    */
    swc_id: string;
    constructor(swc_id) {
        this.swc_id = swc_id;
    }

    public update(){
        return new SWCRegistry().get_latest_version();
    }

    public content(){
        const entry = new SWCRegistry();
        if (entry.get_content_by_file()[this.swc_id] == undefined){
            console.log(`SWC with ID ${this.swc_id} does not exist`);
            return {}
        }
        return entry.get_content_by_file()[this.swc_id]['content'];
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
