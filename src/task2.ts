import fs from 'fs';
import csv from 'csvtojson';
import CSVError from 'csvtojson/v2/CSVError';

const CSV_FILE = './src/nodejs-hw1-ex1.csv';
const OUTPUT_FILE = './src/nodejs-hw1-ex1.txt';

const writeStream = fs.createWriteStream(OUTPUT_FILE);

const csvToJsonTransform = csv()
	.fromFile(CSV_FILE)
	.subscribe(
		(line: string) => {
			return new Promise((resolve) => {
				writeStream.write(JSON.stringify(line) + '\n');
				resolve();
			});
		},
		(error: CSVError) => {
			console.error(error);
		}
	);
