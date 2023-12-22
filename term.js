/*
 * TERM
 */
let termWidth = process.stdout.columns;
let termHeight = process.stdout.rows;

let resizeCallbacks = [];

function updateTermSize() {
    termWidth = process.stdout.columns;
    termHeight = process.stdout.rows;
    for (const callback of resizeCallbacks) {
        callback(termWidth, termHeight);
    }
}

process.stdout.on('resize', updateTermSize);

process.on('exit', () => {
    process.stdout.removeListener('resize', updateTermSize);
});

export {
    termWidth,
    termHeight,
    resizeCallbacks,
};
