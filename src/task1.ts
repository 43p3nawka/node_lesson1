import { stdin, stdout } from 'process';
import { Transform, Writable } from 'stream';

const transformStream = new Transform();

transformStream._transform = (chunk, enconding, callback) => {
	transformStream.push(chunk.toString().trim().split('').reverse().join(''));
	callback();
};

const writableStream = new Writable();

writableStream._write = (chunk, enconding, callback) => {
	stdout.write(`${chunk.toString()}\n\n`);
	callback();
};

stdin.pipe(transformStream).pipe(writableStream);
