/* IO */

// O Muses, sing in me...
import * as readline from 'node:readline/promises';



// r1: heat from fire, fire from heat, radiance, radiance, radiance
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getName = () => r1.question('what is your name? > ');

const say = (msg) => {
    // TODO: this doesn't work
    /*
    const GREEN = '\e[32m';
    const ENDCOLOR = '\e[0m';
    process.stdout.write(`${GREEN}${msg}${ENDCOLOR}`);
    */
    console.log(msg);
};

export {
    getName,
    say,
};
