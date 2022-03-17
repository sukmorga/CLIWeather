#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        //Вывод help
        printHelp();
    }
    if (args.s) {
        //Сохранить город
    }
    if (args.t) {
        saveKeyValue('token', args.t)
        //Сохранить токен
    }
    //Вывести погоду    
};

initCLI();