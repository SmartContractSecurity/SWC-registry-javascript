#!/usr/bin/env node
const fs = require("fs");
const loadJsonFile = require('load-json-file');
var json = require('./swc-definition.json');

class SWCRegistry {
    content: JSON;
    constructor() {
        this.content = json;

    }
    public get_latest_version(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json", true);

        xmlhttp.onreadystatechange = function () {  
        if (xmlhttp.readyState === 4) {  // request completed. we have some results
            if (xmlhttp.status === 200) {  
            console.log(xmlhttp.responseText)
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
        return this.get_latest_version();
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
        return entry.content[this.swc_id];
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
