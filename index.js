/*
 * a program to monitor our health quantitatively, alerting if necessary
 * author: aiur-adept (N.E.S.T.)
 * license: MIT
 */

// our imports
import { HealthMonitorDB, TS_ALL } from './db.js';
import { getName, say } from './io.js';

const birth = async function () {
    const db = HealthMonitorDB.getInstance();
    await db.loadDB();
    const form = db;
    let name = null;
    if (!form.meta.name) {
        name = await getName().then((name) => db.saveMeta('name', name));
    } else {
        name = form.meta.name;
    }
    say(`Hello! Welcome to healthmonitor, ${name}, and may you be happy-minded`);
    return form;
};

const reflect = async function () {
    await birth();

    if (process.argv[2] == '--check') {
        // TODO: Display current stats and handle alerts
    } else if (process.argv[2] == '--write') {
        // TODO: Perform sequence of prompts, save to DB, and display
        for (const category in TS_ALL) {
            // TODO: write getReport()
            await getReport(category);
        }
        await saveDB();
    } else {
        say('should be given an arg of either --check or --write');
        process.exit(1);
    }
};

// all composed things are like a dream
// a drop of dew
// a flash of light
// this is how to observe them, how to meditate on them
reflect();
