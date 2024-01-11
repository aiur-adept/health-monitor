/*
 * DB
 *
 * the DB is structured by daily entries which can be used for alerting,
 * along with a set of tags for each day
 * which can be used for extracting correlations
 */

import * as fs from 'node:fs';

import { sayError } from './io.js';

export const DB_FILE = './health-monitor_db.json';

const TS_GOOD = ['calm', 'joy', 'unified', 'reflection', 'healing', 'community', 'generosity', 'effort', 'patience', 'clarity'];

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

  nullEntry() {
    const entry = this.blankEntry();
    for (const category of TS_GOOD) {
      entry.data[category] = null;
    }
    return entry;
  }

  /* get just the values of a category across each day
    return the last n entries or, if n not provided, all entries */
  destructure(category, n) {
    return this.entries.slice(-(n || this.entries.length)).map(entry => entry.data[category]);
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
            sayError(`Could not open db file ${DB_FILE}; creating blank DB...`);
            await this.save();
            res(this);
          } else {
            const parsedData = JSON.parse(data);
            Object.assign(this, parsedData);
            // Check if there are missing entries and backfill null
            this.backfillMissingEntries();
            // Backfill missing *categories* now
            this.backfillMissingCategories();
            res(this);
          }
        }
      );
    });
  }

  backfillMissingEntries() {
    // Helper function to construct a Date object from a date string
    const constructDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      // Month in JavaScript is 0-indexed, so subtract 1 from the parsed month
      const adjustedMonth = parseInt(month, 10) - 1;
      const d = new Date(year, adjustedMonth, day);
      return d;
    };

    const today = new Date().toLocaleDateString('en-GB'); // Format: dd/MM/yyyy

    // Check if there are existing entries
    if (this.entries.length > 0) {
      const lastEntryDate = this.entries[this.entries.length - 1].date;
      let currentDate = constructDate(lastEntryDate);

      // Loop until currentDate is less than today
      while (currentDate.toLocaleDateString('en-GB') < today) {
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        const nullEntry = this.nullEntry();
        nullEntry.date = currentDate.toLocaleDateString('en-GB');
        this.entries.push(nullEntry);
      }
    }
  }

  backfillMissingCategories() {
    for (let entry of this.entries) {
      for (let category of TS_GOOD) {
        if (!entry.data[category]) {
          entry.data[category] = null;
        }
      }
    }
  }

  insertTodaysEntry(entry) {
    // if today was already noted, overwrite
    if (entry.date == this.entries[this.entries.length - 1].date) {
      this.entries[this.entries.length - 1] = entry;
    } else {
      this.entries.push(entry);
    }
  }

  async saveMeta(key, value) {
    this.meta[key] = value;
    await this.save();
    return value;
  }

  calcStats(category) {
    const ts = this.destructure(category);
    // calculate mean (mu)
    // also: mu legion 4 lyfe (mu is the standard symbol for average,
    // but musical taste is impeccable)
    const sum = (acc, val) => acc + val;
    const tsNumeric = ts.filter(entry => entry.v != null).map(entry => entry.v);
    const tsSum = tsNumeric.reduce(sum, 0);
    const mu = sum / numericArray.length;
    // calculate standard deviation (sd)
    const squaredDifferences = numericArray.map(val => Math.pow(val - mean, 2));
    const sumOfSquaredDifferences = squaredDifferences.reduce(sum, 0);
    const variance = sumOfSquaredDifferences / numericArray.length;
    const sd = Math.sqrt(variance);
    return { mu, sd };
  }
}

export {
  HealthMonitorDB,
  TS_GOOD,
};
