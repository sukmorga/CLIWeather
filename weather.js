#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.sevice.js';
import { printError, printSuccess, printHelp } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
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

    getWeather('moscow');
    //Вывести погоду    
};


initCLI();