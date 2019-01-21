import { SWC } from '../src';

describe('Checking SWC class methods with valid SWC code', () => {
    it('should get title of SWC', () => {
        const swc = new SWC('SWC-100');
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

    it('should get remediation of SWC', () => {
        const swc = new SWC('SWC-100')
        const remediation = swc.remediation();

        expect(remediation).toBe('Functions can be specified as being `external`, `public`, `internal` or `private`. It is recommended to make a conscious decision on which visibility type is appropriate for a function. This can dramatically reduce the attack surface of a contract system.');
    });
});

describe('Checking SWC class methods with invalid SWC code', () => {
    it('should get NULL as title of SWC if there is no entry', () => {
        const swc = new SWC('SWC-000');
        const title = swc.title();

        expect(title).toBe(null);
    });

    it('should get NULL as relationships of SWC if there is no entry', () => {
        const swc = new SWC('SWC-000')
        const relationships = swc.relationships();

        expect(relationships).toBe(null);
    });

    it('should get NULL as description of SWC if there is no entry', () => {
        const swc = new SWC('SWC-000')
        const description = swc.description();

        expect(description).toBe(null);
    });

    it('should get NULL as remediation of SWC if there is no entry', () => {
        const swc = new SWC('SWC-000')
        const remediation = swc.remediation();

        expect(remediation).toBe(null);
    });
});
