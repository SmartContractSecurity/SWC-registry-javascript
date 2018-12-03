import { SWC } from '../src';
const fs = require("fs");

describe('Checking SWC class methods', () => {
    it('should update file swc-definition', () => {
        fs.writeFile("src/swc-definition.json", {}, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            return;
        });
        const swc = new SWC('SWC-100')
        swc.update(err => {
            if(err) {
                console.log(err);
            } else {
                console.log(swc.title());
            }
        });
        const title = swc.title();
        expect(title).toBe('Function Default Visibility');
    });
    it('should get title of SWC', () => {
        const swc = new SWC('SWC-100')
        const title = swc.title();
        expect(title).toBe('Function Default Visibility');
    });
    it('should get relationships of SWC', () => {
        const swc = new SWC('SWC-100')
        const relationships = swc.relationships();
        expect(relationships).toBe('[CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)');
    });
    it('should get description of SWC', () => {
        const swc = new SWC('SWC-100')
        const description = swc.description();
        expect(description).toBe('Functions that do not have a function visibility type specified are `public` by default. This can lead to a vulnerability if a developer forgot to set the visibility and a malicious user is able to make unauthorized or unintended state changes.');
    });
    it('should get title of SWC', () => {
        const swc = new SWC('SWC-100')
        const remediation = swc.remediation();
        expect(remediation).toBe('Functions can be specified as being `external`, `public`, `internal` or `private`. It is recommended to make a conscious decision on which visibility type is appropriate for a function. This can dramatically reduce the attack surface of a contract system.');
    });
});