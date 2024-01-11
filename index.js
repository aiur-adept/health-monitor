/*
 * a program to monitor our health quantitatively, alerting if necessary
 * author: aiur-adept (N.E.S.T.)
 * license: MIT
 */

// our imports
import { HealthMonitorDB, TS_GOOD } from './db.js';
import { getName, say, magic } from './io.js';
import { displayTS } from './display.js';
import { checkin } from './checkin.js';
import { parseMode } from './cli.js';

/* get name and form (nama+rupa)
 * AKA, init the DB */
const birth = async function () {
    const form = HealthMonitorDB.getInstance();
    await form.load();
    let name = null;
    if (!form.meta.name) {
        name = await getName().then((name) => form.saveMeta('name', name));
    } else {
        name = form.meta.name;
    }
    say(`Hello! Welcome to healthmonitor, ${name}, and may you be happy-minded`);
    return form;
};

/* read the DB (aka display TS) */
const read = (form) => {
    magic("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    magic("~~~~~~~~~~~~~~~ reflect on the past ~~~~~~~~~~~~~~~");
    magic("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    for (const category of TS_GOOD) {
        magic(category);
        // TODO: display only last 14 days (with an ellipsis to the left if applicable)
        displayTS(form.destructure(category, 7 + 7));
        // TODO: handle alerts/warnings?
    }
    say('Thank you for taking the time to check in! May you be happy-minded.');
    process.exit(0);
};

/* get readings from user and save to DB */
const write = async function (form) {
    // iterate each category and get report
    const entry = await checkin(form);
    form.insertTodaysEntry(entry);
    await form.save();
    // continue?
    say('Well done! Your health is worth reflecting on, and may it blossom!');
    read(form);
}

/* program entrypoint */
const reflect = async function (x) {
    const form = await birth();
    const mode = parseMode(x);
    console.log(`mode: ${mode}`);
    switch (mode) {
        case 'r':
            read(form);
            break;
        case 'w':
        default:
            write(form);
            break;
    };
};

// all composed things are like a dream
// a drop of dew
// a flash of light
// this is how to observe them, how to meditate on them
reflect(process.argv[2]);
