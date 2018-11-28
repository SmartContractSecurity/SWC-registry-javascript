const fs = require('fs');


class SWCRegistry {
    constructor() {
        this.content = null;
    }
    get get_latest_version(){
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

    get load_from_file(){
        let rawdata = fs.readFileSync('swc-definition.json'); 
        this.content = JSON.parse(rawdata);
    }

    get content(){
        if (this.content == null){
            self._load_from_file()
        }
        return self.content
    }

    get update(){
        self.content = SWCRegistry._get_latest_version()
    }
}

class SWC {
    /*
    SWC class contains information on an SWC entry

    Example usage:
        swc = new SWC('SWC-100')
        console.log(swc.title)
    */
    constructor(swc_id, get_last=false) {
        this.swc_id = swc_id;
        if (get_last){
            new SWCRegistry().update()
        }
    }

    get swc_content(){
        return SWCRegistry().content
    }

    get content() {
        let entries = this.swc_content;

        let rawdata = fs.readFileSync('swc-definition.json');  
        let swc_object = JSON.parse(rawdata)[this.swc_id];
        if (swc_object !== null){
            return swc_object['content']
        }
        else {
            return ("SWC with ID %s does not exist", this.swc_id)
        }
    }

    get title(){
        let content = this.content
        let title = content["Title"]
        return title
    }
    get relationships(){
        let content = this.content
        let relationships = content["Relationships"]
        return relationships
    }
    get relationships(){
        let content = this.content
        let description = content["Description"]
        return description
    }
    get remediation(){
        let content = this.content
        let remediation = content["Remediation"]
        return remediation
    }
}