import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import * as dotenv from 'dotenv';
dotenv.config();

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