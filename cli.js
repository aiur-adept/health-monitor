/* parse mode from args (read/write) */
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

export {
    parseMode,
};