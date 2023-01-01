#!/usr/bin/env node
import getArgs from './helpers/args.js';
import { printWeather, printHelp, printError, printSuccess } from './services/log.service.js';
import saveKeyValue, { TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import getWeather, { getIcon } from './services/api.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен!');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен был записан');
	} catch (error) {
		printError(error.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('Город не передан!');
		return;
	}

	const normalizeCity = city.toLowerCase().trim();

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, normalizeCity);
		printSuccess('Город был записан');
	} catch (error) {
		printError(error.message);
	}
};

const getForcast = async () => {
	try {
		const city = await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		const icon = getIcon(weather.weather[0].icon);

		printWeather(weather, icon);
	} catch (error) {
		if (error?.response?.status === 404) {
			printError('Неверно указан город');
		} else if (error?.response?.status === 401) {
			printError('Неверно указан Токен')
		} else if (error?.response?.status === 400) {
			printError('Город не был передан. установить город -s [CITY]')
		} else {
			printError(error.message);
		}
	}
};

const init = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.t) {
		return saveToken(args.t);
	}

	if (args.s) {
		return saveCity(args.s);
	}

	getForcast();
};



init();