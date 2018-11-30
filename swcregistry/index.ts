#!/usr/bin/env node
import { XMLHttpRequest } from 'xmlhttprequest-ts';

const fs = require("fs");
var json = require('./swc-definition.json');

class SWCRegistry {
    content: JSON;
    constructor() {
        this.content = json;

    }
    async getPersonFullNameUsingAsync() {
        let response = await fetch('https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json');
        this.content = await response.json();
    }

    public  get_latest_version(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json", true);

        xmlhttp.onreadystatechange = function () {  
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                this.content = xmlhttp.responseText;
                console.log(">>>> update content - ", this.content);
            } else {  
                console.log("Oops", xmlhttp.statusText);  
            }  
        }  
        }; 
        xmlhttp.send(null); 
    }

    public load_from_file(){
        return json
    }

    public update(){
        return this.getPersonFullNameUsingAsync();
        // return this.get_latest_version();
    }
}

export class SWC {
    /*
    SWC class contains information on an SWC entry

    Example usage:
        swc = new SWC('SWC-100')
        console.log(swc.title)
    */
    swc_id: string;
    constructor(swc_id, get_last=false) {
        this.swc_id = swc_id;
        if (get_last){
            new SWCRegistry().update();
        }
    }

    public content(){
        const entry = new SWCRegistry();
        if (entry.content[this.swc_id] == undefined) {
            console.log(`SWC with ID ${this.swc_id} does not exist`);
            return {}
        }
        return entry.content[this.swc_id]['content'];
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

const swc = new SWC('SWC-100', true);
console.log(swc.title());