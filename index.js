/*
 * a program to monitor our health quantitatively, alerting if necessary
 * author: aiur-adept (N.E.S.T.)
 * license: MIT
 */

import chalk from 'chalk';

// our imports
import { HealthMonitorDB, TS_GOOD } from './db.js';
import { getName, getReport, say, magic } from './io.js';
import { displayValue, displayTS } from './display.js';

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

const read = (form) => {
    magic("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    magic("~~~~~~~~~~~~~~~ reflect on the past ~~~~~~~~~~~~~~~");
    magic("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    for (const category of TS_GOOD) {
        magic(category);
        displayTS(form.destructure(category));
        // TODO: handle alerts/warnings?
    }
    say('Thank you for taking the time to check in! May you be happy-minded.');
    process.exit(0);
};

const checkin = async function (form) {
    // print banner
    console.log();
    say('... ~~~ Hover your hand above the numbers, and press what feels right:');
    console.log();
    // make a blank entry for today
    const entry = form.blankEntry();
    const saneFormat = 'en-GB'; // DD-MM-YYYY
    entry.date = new Date().toLocaleDateString(saneFormat);
    // iterate categories
    for (const category of TS_GOOD) {
        let validInt = false;
        while (!validInt) {
            const response = await getReport(category);
            const parsed = parseInt(response);
            validInt = !isNaN(parsed) && (parsed >= 1 && parsed <= 9);
            if (!validInt) {
                sayError('Please enter a valid integer from [1-9]');
            } else {
                const {character, color} = displayValue(parsed);
                console.log(chalk[color](character));
                entry.data[category] = parsed;
            }
        }
    }
    return entry;
};

const write = async function (form) {
    // iterate each category and get report
    const entry = await checkin(form);
    form.entries.push(entry);
    await form.save();
    // continue?
    say('Well done! Your health is worth reflecting on, and may it blossom!');
    read(form);
}

const parseMode = (x) => {
    switch (x) {
        case '-r':
        case '--read':
            return 'r';
        case '-w':
        case '--write':
            return 'w';
        default:
            return null;
    }
}

const reflect = async function (x) {
    const form = await birth();
    const mode = parseMode(x);
    console.log(`mode: ${mode}`);
    switch (mode) {
        case 'r':
            read(form);
            break;
        case 'w':
            write(form);
            break;
        default:
            say('should be given an arg of either --check or --write');
            process.exit(1);
            break;
    };
};

// all composed things are like a dream
// a drop of dew
// a flash of light
// this is how to observe them, how to meditate on them
reflect(process.argv[2]);
