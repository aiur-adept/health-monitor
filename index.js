/*
 * a program to monitor our health quantitatively, alerting if necessary
 * author: aiur-adept (N.E.S.T.)
 * license: MIT
 */

// our imports
import { saveDB, loadDB, saveKVToDB, saveTSToDB } from './db.js';
import { getName, say } from './io.js';





const dhamma = async function() {
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

    // --read
    // 1. display current stats
    // 2. display & handle alerts
    //
    // --write
    // 1. sequence of prompts
    // 2. save to DB
    // 3. display & handle alerts if applicable
};

dhamma(); // meaning "logos", "phenomenon", "element", "way", and "teaching"

// all composed things are like a dream
// a drop of dew
// a flash of light
// this is how to observe them, how to meditate on them
