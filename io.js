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

const getName = () => r1.question(chalk.green('what is your name? > '));
const getReport = (category) => r1.question(chalk.green(`${category}? > `));

const say = (msg) => {
    console.log(chalk.green(msg));
};
const sayError = (msg) => {
    console.log(chalk.grey(msg));
};
const magic = (msg) => {
    console.log(chalk.blue(msg));
}

export {
    getName,
    getReport,
    say,
    sayError,
    magic,
};
