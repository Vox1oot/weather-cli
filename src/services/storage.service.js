import { homedir }  from 'os';
import { join } from 'path';
import { writeFile, readFile, stat } from 'fs/promises'

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city',
};

const saveKeyValue = async (key, value) => {
	let data = {};

	if (await isExist(filePath)) {
		const fileData = await readFile(filePath);
		data = JSON.parse(fileData);
		
	}

	data[key] = value;
	writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const fileData = await readFile(filePath);
		const data = JSON.parse(fileData);
		return data[key] ?? null;
	}
	return null;
};

const isExist = async (path) => {
	try {
		await stat(path);
		return true;
	} catch (error) {
		return false;
	}
};

export { getKeyValue, TOKEN_DICTIONARY };
export default saveKeyValue;