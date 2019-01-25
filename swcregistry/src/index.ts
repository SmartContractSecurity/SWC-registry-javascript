import fs = require('fs');
import fetch from 'node-fetch';

const dataPath = __dirname + '/swc-definition.json';
const rawData = require(dataPath);

class SWC {
  private SWCID: string;
  private rawData: JSON;

  constructor(SWCID: string) {
    this.SWCID = SWCID;
    this.rawData = rawData;
  }

  private updateFileContent(content: JSON, done: (error: Error | null) => void): void {
    let callback = (err?: Error) => {
      if (err) {
        console.error(err);
        done(err);
      } else {
        done(null);
      }
    };

    this.rawData = content;

    fs.writeFile(dataPath, JSON.stringify(content), callback);
  }

  public update(done: (error: Error | null) => void): void {
    const url: string =
      'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json';

    fetch(url)
      .then((response: any) => response.json())
      .then((content: JSON) => this.updateFileContent(content, done))
      .catch((error: Error) => done(error));
  }

  private entry(): any {
    return (this.rawData as any)[this.SWCID];
  }

  public title(): string | null {
    const entry = this.entry();

    return entry ? entry['content']['Title'] : null;
  }

  public relationships(): string | null {
    const entry = this.entry();

    return entry ? entry['content']['Relationships'] : null;
  }

  public description(): string | null {
    const entry = this.entry();

    return entry ? entry['content']['Description'] : null;
  }

  public remediation(): string | null {
    const entry = this.entry();

    return entry ? entry['content']['Remediation'] : null;
  }
}

export { SWC };
