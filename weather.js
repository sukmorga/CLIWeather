#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }

}

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        //Вывод help
        printHelp();
    }
    if (args.s) {
        //Сохранить город
    }
    if (args.t) {
        return saveToken(args.t)
        //Сохранить токен
    }
    //Вывести погоду    
};

initCLI();