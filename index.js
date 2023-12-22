/*
 * a program to monitor our health quantitatively, alerting if necessary
 * author: aiur-adept (N.E.S.T.)
 * license: MIT
 */

// our imports
import { saveDB, loadDB, saveKVToDB, saveTSToDB } from './db.js';
import { getName, say } from './io.js';
import { termWidth, termHeight, resizeCallbacks } from './term.js';



const dhamma = async function () {
    //
    // from name and form come therefore
    // the whole chain of lynx,
    // mutual co-arising...
    //
    const form = await loadDB();
    let name = null;

    if (!form['obj']['name']) {
        name = await getName().then(saveKVToDB(form, 'name'));
    } else {
        name = form['obj']['name'];
    }

    say(`Hello! Welcome to healthmonitor, ${name}`);

    // TODO: do this with a proper library
    if (process.argv[2] == '--read') {
        // Display current stats and handle alerts
    } else if (process.argv[2] == '--write') {
        // Perform sequence of prompts, save to DB, and handle alerts
    } else {
        say('should be given an arg of either --read or --write');
        process.exit(1);
    }
};

dhamma(); // meaning "logos", "phenomenon", "element", "way", and "teaching"

// all composed things are like a dream
// a drop of dew
// a flash of light
// this is how to observe them, how to meditate on them
