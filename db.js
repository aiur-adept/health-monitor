/* DB
 *
 * the DB is structured by daily entries which can be used for alerting,
 * along with a set of tags for each day
 * which can be used for extracting correlations
 */

import * as fs from 'node:fs';



const DB_FILE = './health-monitor_db.json';

// form is emptiness, and emptiness is form
let blankDB = {
    // virtues
    calm: [],
    joy: [],
    unified: [],
    reflection: [],
    community: [],
    // the three poisons
    craving: [],
    anticraving: [],
    delusion: [],
    // each day has a tag
    tags: [],
    // k/v storage
    obj: {},
};

// save memdb to file
const saveDB = (db) => {
    return new Promise((res, rej) => {
        fs.writeFile(DB_FILE,
            JSON.stringify(db, undefined, 2),
            (error) => {
                if (error) {
                    rej(error);
                } else {
                    res(true);
                }
            });
    });
};

const loadDB = () => {
    return new Promise((res, rej) => {
        fs.readFile(DB_FILE,
            'utf8',
            async function (error, data) {
                if (error) {
                    await saveDB(blankDB);
                    res(blankDB);
                } else {
                    res(JSON.parse(data));
                }
            });
    });
};

const saveKVToDB = (db, key) => {
    return (val) => {
        return new Promise(async function (res, rej) {
            console.log(`saving [${key}: ${val}] to DB...`);
            db['obj'][key] = val;
            await saveDB(db);
            res(val);
        });
    }
}

// save an observation to a timeseries in the DB
const saveTSToDB = (db, tsKey, observation) => {
    return (val) => {
        return new Promise((res, rej) => {
            console.log(`saving [${key}: ${val}] to DB...`);
            // TODO: persist
            res(val);
        });
    }
};

export {
    saveDB,
    loadDB,
    saveKVToDB,
    saveTSToDB,
};
