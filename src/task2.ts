import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';

const CSV_FILE = path.join(__dirname, process.argv[2] || 'nodejs-hw1-ex2.csv');
const OUTPUT_FILE = path.join(
	__dirname,
	process.argv[3] || 'nodejs-hw1-ex2.txt'
);

const writeStream = fs.createWriteStream(OUTPUT_FILE);

// fake db driver
const db = {
	write: (data: string): Promise<Boolean> => {
		const operationDelay = 200;
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, operationDelay);
		});
	},
};

const logger = {
	error: (error: Error) => {
		console.error(error);
	},
	log: (logData: string) => {
		console.log(logData);
	},
};

csv()
	.fromFile(CSV_FILE)
	.subscribe((line: string) => {
		return new Promise((resolve) => {
			db.write(line)
				.then(() => {
					writeStream.write(JSON.stringify(line) + '\n');
					resolve();
				})
				.catch(logger.error);
		});
	}, logger.error);
