/*
 * IO 
 */

// O Muses, sing in me...
import * as readline from 'node:readline/promises';
import chalk from 'chalk';


// r1: heat from fire, fire from heat, radiance, radiance, radiance
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getName = () => r1.question('what is your name? > ');

const say = (msg) => {
    console.log(chalk.green(msg));
};
const sayError = (msg) => {
    console.log(chalk.grey(msg));
};

export {
    getName,
    say,
    sayError,
};
