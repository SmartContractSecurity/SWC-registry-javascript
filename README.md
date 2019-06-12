# SWC-registry-javascript
[![CircleCI](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript.svg?style=svg)](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript)

Javascript library for accessing an [SWC-registry](https://github.com/SmartContractSecurity/SWC-registry) entries.

## Example
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

## CLI

Library provides CLI `swc-cli` executable. Usage:

```bash
# Print manual
swc-cli --help

# Download latest SWC-registry JSON snapshot
swc-cli --update

# View markdown of specific SWC entry
swc-cli --markdown SWC-100
```
