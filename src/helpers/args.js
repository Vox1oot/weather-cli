export default (args) => {
	const [execPath, filePath, ...rest] = args;

	const result = rest.reduce((acc, current, index, array) => {
		if (current[0] === '-') {
			const arg = current.substring(1);

			if (index === array.length - 1) {
				return {...acc, [arg]: true}
			}

			if (array[index + 1][0] !== '-') {
				return { ...acc, [arg]: array[index + 1] };
			}

			return {...acc, [arg]: true}
		}
		return acc;
	}, {});

	return result;
};