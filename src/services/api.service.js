import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import * as dotenv from 'dotenv';
dotenv.config();

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '🌞';
		case '02':
			return '⛅';
		case '03':
			return '⛅';
		case '04':
			return '⛅';
		case '09':
			return '⛈';
		case '11':
			return '🌨';
		case '13':
			return '❆';
		case '50':
			return '🌫';
	}
}

const getWeather = async (city) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

	if (!token) {
		throw new Error('Не задан ключ API. Добавьте ключ командой: -t [API_KEY]');
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			units: 'metric',
			lang: 'ru',
		},
	});
	
	return data;
};

export default getWeather;