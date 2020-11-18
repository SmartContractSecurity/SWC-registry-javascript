import { SWC, EntryData, Entry } from '../src';

describe('Checking SWC.getRegistry()', () => {
    it('Should return registry with valid data structure', () => {
        const swc = new SWC();
        const registry = swc.getRegistry();

        expect(registry).toEqual(expect.any(Object));

        for (const key in registry) {
            const entry = registry[key];

            expect(key).toMatch(/^SWC-\d{3,3}$/);

            expect(entry).toEqual(expect.any(Object));
            expect(entry.markdown).toEqual(expect.any(String));
            expect(entry.content).toEqual(expect.any(Object));

            const data = entry.content;

            expect(data.Title).toEqual(expect.any(String));
            expect(data.Relationships).toEqual(expect.any(String));
            expect(data.Description).toEqual(expect.any(String));
            expect(data.Remediation).toEqual(expect.any(String));
        }
    });
});

describe('Checking SWC.getEntry()', () => {
    it('Should return SWC entry', () => {
        const swc = new SWC();
        const entry = swc.getEntry('SWC-100') as Entry;

        expect(entry.markdown).toEqual(expect.any(String));
        expect(entry.content).toEqual(expect.any(Object));

        const { markdown, content } = entry;

        expect(markdown).toContain('Function Default Visibility');

        expect(markdown).toContain(
            '[CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)'
        );

        expect(markdown).toContain(
            'Functions that do not have a function visibility type specified are `public` by default. This can lead to a vulnerability if a developer forgot to set the visibility and a malicious user is able to make unauthorized or unintended state changes.'
        );

        expect(markdown).toContain(
            'Functions can be specified as being `external`, `public`, `internal` or `private`. It is recommended to make a conscious decision on which visibility type is appropriate for a function. This can dramatically reduce the attack surface of a contract system.'
        );

        expect(content.Title).toBe('Function Default Visibility');

        expect(content.Relationships).toBe(
            '[CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)'
        );

        expect(content.Description).toBe(
            'Functions that do not have a function visibility type specified are `public` by default. This can lead to a vulnerability if a developer forgot to set the visibility and a malicious user is able to make unauthorized or unintended state changes.'
        );

        expect(content.Remediation).toBe(
            'Functions can be specified as being `external`, `public`, `internal` or `private`. It is recommended to make a conscious decision on which visibility type is appropriate for a function. This can dramatically reduce the attack surface of a contract system.'
        );
    });

    it('Should return undefined if there is no entry', () => {
        const swc = new SWC();
        const data = swc.getEntry('SWC-000');

        expect(data).toBeUndefined();
    });
});

describe('Checking SWC.getEntryMarkDown()', () => {
    it('Should return markdown of SWC entry', () => {
        const swc = new SWC();
        const doc = swc.getEntryMarkDown('SWC-100');

        expect(doc).toContain('Function Default Visibility');

        expect(doc).toContain(
            '[CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)'
        );

        expect(doc).toContain(
            'Functions that do not have a function visibility type specified are `public` by default. This can lead to a vulnerability if a developer forgot to set the visibility and a malicious user is able to make unauthorized or unintended state changes.'
        );

        expect(doc).toContain(
            'Functions can be specified as being `external`, `public`, `internal` or `private`. It is recommended to make a conscious decision on which visibility type is appropriate for a function. This can dramatically reduce the attack surface of a contract system.'
        );
    });

    it('Should return undefined if there is no entry', () => {
        const swc = new SWC();
        const doc = swc.getEntryMarkDown('SWC-000');

        expect(doc).toBeUndefined();
    });
});

describe('Checking SWC.getEntryData()', () => {
    it('Should return valid content of SWC entry', () => {
        const swc = new SWC();
        const data = swc.getEntryData('SWC-100') as EntryData;

        expect(data).toBeDefined();

        expect(data.Title).toBe('Function Default Visibility');

        expect(data.Relationships).toBe(
            '[CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)'
        );

        expect(data.Description).toBe(
            'Functions that do not have a function visibility type specified are `public` by default. This can lead to a vulnerability if a developer forgot to set the visibility and a malicious user is able to make unauthorized or unintended state changes.'
        );

        expect(data.Remediation).toBe(
            'Functions can be specified as being `external`, `public`, `internal` or `private`. It is recommended to make a conscious decision on which visibility type is appropriate for a function. This can dramatically reduce the attack surface of a contract system.'
        );
    });

    it('Should return undefined if there is no entry', () => {
        const swc = new SWC();
        const data = swc.getEntryData('SWC-000');

        expect(data).toBeUndefined();
    });
});
