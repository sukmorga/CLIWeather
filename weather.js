#!/usr/bin/env node
import dedent from 'dedent-js';
import chalk from 'chalk';
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.sevice.js';
import { printError, printSuccess, printHelp } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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

};

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен');
    } catch (e) {
        printError(e.message);
    }

};

const getForcast = async () => {
    const cityName = await getKeyValue(TOKEN_DICTIONARY.city)

    try {
        const weather = await getWeather(cityName);
        console.log(
            dedent`Погода в городе ${chalk.bgMagenta(weather.name)}:
            Температура: ${chalk.bgYellow(weather.main.temp)} градусов, ${chalk.bgYellow(weather.weather[0].description)}
            Скорость ветра: ${chalk.bgRedBright(weather.wind.speed)} м/с
            Видимость: ${chalk.bgRedBright(weather.visibility)} метров 
            `
        );
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
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
        return saveCity(args.s)
    }
    if (args.t) {
        //Сохранить токен
        return saveToken(args.t)
    }
    getForcast();
};


initCLI();