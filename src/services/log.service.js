import chalk from 'chalk';
import dedent from 'dedent-js';

const log = console.log;

const printError = (error) => {
	log(`${chalk.bgRed(' ERROR ' )} -> ${chalk.red(error)}`);
};

const printSuccess = (message) => {
	log(`${chalk.bgGreen(' SUCCESS ')} -> ${chalk.green(message)}`);
};

const printHelp = () => {
	log(
		dedent`${chalk.bgCyan(' HELP: ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода города
		-t [API_KEY] для сохранения токена
		`
	);
};

const printWeather = (weather, icon) => {
	log(
		dedent`${chalk.bgCyan(' ПОГОДА: ')}
		Погода в городе: ${weather.name}
		${weather.weather[0].description} -> ${icon} 
		Температура: ${weather.main.temp} °С
		`
	);
}

export { printWeather, printError, printSuccess, printHelp };
