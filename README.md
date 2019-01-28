# SWC-registry-javascript
[![CircleCI](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript.svg?style=svg)](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript)

Javascript library for accessing SWC-registry definitions. 

## Example
```typescript
import { SWC } from 'swc-registry';

const swc: SWC = new SWC('SWC-100');

console.log(swc.title());

// Function Default Visibility
```

## Behaviour

The repository contains an export from the SWC-registry (swc-definition.json). The latest version of the SWC-registry can be downloaded by using the `update()` method.

### Get latest version
```typescript
import { SWC } from 'swc-registry';

const swc = new SWC('SWC-100');

swc.update(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(swc.relationships());
    }
});

// [CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)
```

Update is also available via CLI command:

```
npm explore swc-registry -- npm run cli update
```
