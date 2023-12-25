/*
 * DB
 *
 * the DB is structured by daily entries which can be used for alerting,
 * along with a set of tags for each day
 * which can be used for extracting correlations
 */

import * as fs from 'node:fs';

const DB_FILE = './health-monitor_db.json';

const TS_GOOD = ['calm', 'joy', 'unified', 'reflection', 'community', 'patience', 'clarity'];

class HealthMonitorDB {
  constructor() {
    this.entries = [];
    this.meta = {};
  }

  static getInstance() {
    if (!HealthMonitorDB.instance) {
      HealthMonitorDB.instance = new HealthMonitorDB();
    }
    return HealthMonitorDB.instance;
  }

  blankEntry() {
    return {
      date: null,
      data: {},
      tags: [],
    };
  }

  destructure(category) {
    const result = [];
    this.entries.forEach(entry => {
      if (entry.data && entry.data[category] !== undefined) {
        result.push(entry.data[category]);
      }
    });
    return result;
  };

  async save() {
    return new Promise((res, rej) => {
      fs.writeFile(
        DB_FILE,
        JSON.stringify(this, undefined, 2),
        (error) => {
          if (error) {
            rej(error);
          } else {
            res(true);
          }
        }
      );
    });
  }

  async load() {
    return new Promise((res, rej) => {
      fs.readFile(
        DB_FILE,
        'utf8',
        async (error, data) => {
          if (error) {
            console.error(`Could not open db file ${DB_FILE}; creating blank DB...`);
            await this.save();
            res(this);
          } else {
            const parsedData = JSON.parse(data);
            Object.assign(this, parsedData);
            res(this);
          }
        }
      );
    });
  }

  async saveMeta(key, value) {
    this.meta[key] = value;
    await this.save();
    return value;
  }
}

export {
    HealthMonitorDB,
    TS_GOOD,
};
