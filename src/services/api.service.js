/* https://api.openweathermap.org/data/2.5/weather?q=chelyabinsk&appid=10797f0901b1099ed9410d48268f58cc&units=metric&lang=ru */
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);

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

await getWeather('chelyabinsk');