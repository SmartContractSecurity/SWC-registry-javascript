#!/usr/bin/env node
import { XMLHttpRequest } from 'xmlhttprequest-ts';

import fs = require('fs');
import fetch = require('node-fetch');
import path = require('path');
const rawdata = require('./swc-definition.json');

const dirString = path.dirname(fs.realpathSync(__filename));

class SWC {
  /*
    SWC class contains information on an SWC entry

    Example usage:
        swc = new SWC('SWC-100')
        console.log(swc.title)
    If you need a latest version of swc-definition.json file, use:
        const swc = new SWC('SWC-100');
        swc.update(err => {
            if(err) {
                console.log(err);
            } else {
                console.log(swc.title());
            }
        });
    */
  private SWCID: string;
  private rawdata: JSON;
  constructor(SWCID) {
    this.SWCID = SWCID;
    this.rawdata = rawdata;
  }

  public update_file_content(content, done) {
    this.rawdata = content;
    fs.writeFile('swc-definition.json', JSON.stringify(content), err => {
      if (err) {
        console.error(err);
        done(err);
        return;
      }
      done(null);
      return;
    });
  }

  public update(done) {
    const url =
      'https://raw.githubusercontent.com/SmartContractSecurity/SWC-registry/master/export/swc-definition.json';
    return fetch(url)
      .then(res => res.json())
      .then(res => this.update_file_content(res, done))
      .catch(err => done(err));
  }

  public title() {
    return this.rawdata[this.SWCID]['content']['Title'];
  }
  public relationships() {
    return this.rawdata[this.SWCID]['content']['Relationships'];
  }
  public description() {
    return this.rawdata[this.SWCID]['content']['Description'];
  }
  public remediation() {
    return this.rawdata[this.SWCID]['content']['Remediation'];
  }
}
export { SWC };
