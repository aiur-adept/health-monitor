/*
 * DISPLAY
 *
 * We display timeseries horizontally using box chars
 *
    // Example mood ts for the last 14 days
    const moodTS = [6, 7, 8, 2, 5, 5, 7, 8, 6, 5, 9, 9, 9, 8];
*/

import chalk from 'chalk';

// values from 1-9
const BOXEN = ['_', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];



const displayValue = (value) => {
    if (value === null) {
        return { character: 'x', color: 'grey' };
    }
    const percentage = (value / 9) * 100;
    const charIndex = Math.round((percentage / 100) * (BOXEN.length - 1));
    const character = BOXEN[charIndex];
    // color-coding
    let color = 'green'; // Default to green
    if (percentage < 40) {
        color = 'red'; // Less than 40% is red
    } else if (percentage < 65) {
        color = 'yellow'; // Less than 65% is yellow
    }
    return { character, color };
};

// Function to display the horizontal time series
const displayTS = (ts) => {
    // for each data point
    ts.forEach((value, index) => {
        // select box
        const { character, color } = displayValue(value);
        process.stdout.write(chalk[color](character));
    });
    if (ts[ts.length - 1]) {
        const diff = ts[ts.length - 1] - ts[ts.length - 2];
        let color = (diff == 0) ? 'white' : ((diff < 0) ? 'yellow' : 'green');
        process.stdout.write(` ${chalk[color](diff)}`);
    }

    console.log(); // Move to the next line after displaying the time series
}

export {
    displayValue,
    displayTS,
};
