import chalk from 'chalk';

import { TS_GOOD } from './db.js';
import { getReport, say } from './io.js';
import { displayValue } from './display.js';

/* get readings from user */
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

export {
    checkin,
};