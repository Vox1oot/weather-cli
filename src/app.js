#!/usr/bin/env node
import getArgs from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import saveKeyValue, { TOKEN_DICTIONARY } from './services/storage.service.js';
import getWeather from './services/api.service.js';

const saveToken = async (token) => {
	
	if (!token.length) {
		printError('Не передан токен!');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token has been saved');
	} catch (error) {
		printError(error.message);
	}
};

const getForcast = async () => {
	try {
		const weather = await getWeather('chelyabins');
		console.log(weather);
	} catch (error) {
		if (error?.response?.status === 404) {
			printError('Неверно указан город');
		} else if (error?.response?.status === 401) {
			printError('неверно указан Токен')
		} else {
			printError(error.message);
		}
	}
};

const init = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		printHelp();
	}

	if (args.t) {
		return saveToken(args.t);
	}

	if (args.s) {

	}

	getForcast();
};



init();