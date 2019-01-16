# SWC-registry-javascript
[![CircleCI](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript.svg?style=svg)](https://circleci.com/gh/SmartContractSecurity/SWC-registry-javascript)

Python library for accessing SWC-registry content


## Example
```typescript
const { SWC } = require('swc-registry');


const swc = new SWC('SWC-100');
console.log(swc.title());

// Function Default Visibility
```

## Behaviour

On first use of the SWC methods, the SWC registry is initialized from file (swc-definition.json) out cache. If user want to get a latest information of SWC-registry he will have to use the update() method

### Get latest version
```typescript
const { SWC } = require('swc-registry');


const swc = new SWC('SWC-100');

swc.update(err => {
if(err) {
    console.log(err);
} else {
    console.log(swc.relationships());
}});

// [CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)
```
