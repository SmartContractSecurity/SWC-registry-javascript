# SWC-registry-javascript
[![CircleCI](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript.svg?style=svg)](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript "CircleCI")
[![npm version](http://img.shields.io/npm/v/swc-registry.svg?style=flat)](https://npmjs.org/package/swc-registry "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT "MIT")

Javascript library for accessing an [SWC-registry](https://github.com/SmartContractSecurity/SWC-registry) entries.

## Installation

* Global installation:
```bash
npm install -g swc-registry;
```

* Installation as dependency:
```bash
npm install --save swc-registry
```

## Usage
```javascript
import { SWC } from 'swc-registry';

const swc = new SWC();
const data = swc.getEntryData('SWC-100');

if (data) {
    console.log(data.Title, data.Relationships, data.Description, data.Remediation);
} else {
    throw new Error('Invalid SWC id');
}
```

## CLI mode

Library provides `swc-cli` executable for command-line interface. Usage examples:

```bash
# Print manual
swc-cli --help

# Download latest SWC-registry JSON snapshot
swc-cli --update

# View markdown of specific SWC entry
swc-cli --markdown SWC-100
```

## License

[MIT](http://opensource.org/licenses/MIT)
