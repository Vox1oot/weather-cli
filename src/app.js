#!/usr/bin/env node
import getArgs from './helpers/args.js';


const init = () => {
	const args = getArgs(process.argv);
	console.log(args);
};

init();