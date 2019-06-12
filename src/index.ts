export interface EntryData {
    Title: string;
    Relationships: string;
    Description: string;
    Remediation: string;
}

export interface Entry {
    markdown: string;
    content: EntryData;
}

export interface Registry {
    [id: string]: Entry;
}

const cachePath = __dirname + '/swc-definition.json';
const cacheData: Registry = require(cachePath);

export class SWC {
    private registry: Registry = cacheData;

    getRegistry(): Registry {
        return this.registry;
    }

    getEntry(id: string): Entry | undefined {
        return id in this.registry ? this.registry[id] : undefined;
    }

    getEntryMarkDown(id: string): string | undefined {
        return id in this.registry ? this.registry[id].markdown : undefined;
    }

    getEntryData(id: string): EntryData | undefined {
        return id in this.registry ? this.registry[id].content : undefined;
    }
}
