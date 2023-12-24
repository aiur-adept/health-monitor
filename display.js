/*
 * DISPLAY
 *
 * We display timeseries horizontally using box chars
 *
    // Example mood ts for the last 14 days
    const moodTS = [6, 7, 8, 2, 5, 5, 7, 8, 6, 5, 9, 9, 9, 8];
*/

import chalk from 'chalk';

// Function to display the horizontal time series
function displayTS(ts) {
    // values from 1-9
    const boxen = ['_', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    // for each data point
    ts.forEach((value, index) => {
        // select box
        const percentage = (value / 9) * 100;
        const charIndex = Math.round((percentage / 100) * (boxen.length - 1));
        const character = boxen[charIndex];
        // color-coding
        let color = 'green'; // Default to green
        if (percentage < 50) {
            color = 'red'; // Less than 50% is red
        } else if (percentage < 75) {
            color = 'yellow'; // Less than 75% is yellow
        }
        process.stdout.write(chalk[color](character));
    });
    console.log(); // Move to the next line after displaying the time series
}

export {
    displayTS,
};
