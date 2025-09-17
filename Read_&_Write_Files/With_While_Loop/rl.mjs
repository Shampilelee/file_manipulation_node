import * as readline from "readline";
import { stdin as usr_In, stdout as usr_Output } from "process";

const rl = readline.createInterface({input: usr_In, output: usr_Output});

export function ask_Usr(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    })
}

export function close_Rl() {
    rl.close();
}
