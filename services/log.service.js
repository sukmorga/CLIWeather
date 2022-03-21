import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = error => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = message => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [SITY] - для установки города
        -h - вывод помощи
        -t [API_KEY] - для установки токена
        `
    );
}

const printWeather = (weather) => {
    console.log(
        dedent`${chalk.bgYellow(' WEATHER ')}
        Погода в городе ${chalk.bgMagenta(weather.name)}:
        Температура: ${chalk.bgYellow(weather.main.temp)} градусов, ${chalk.bgYellow(weather.weather[0].description)} 
        Скорость ветра: ${chalk.bgRedBright(weather.wind.speed)} м/с
        Видимость: ${chalk.bgRedBright(weather.visibility)} метров 
        `
    );
}

export { printError, printSuccess, printHelp, printWeather };