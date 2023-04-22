import { readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { checkFileExist, isPathExists } from './fs.js';
import { getAbsolutePath } from './navigation.js';

export const catFile = async (filepath) => {
  try {
    const fullFilePath = getAbsolutePath(filepath);
    await checkFileExist(fullFilePath);

    const fileContent = await readFile(fullFilePath, { encoding: 'utf-8' });
    console.log(fileContent);
  } catch(err) {
    throw err;
  }
};

export const createFile = async (filename) => {
  try {
    const fullFilePath = getAbsolutePath(filename);
    const isFileExist = await isPathExists(fullFilePath);
    if (isFileExist) {
      throw new Error('File already exist, choose another name');
    }

    return new Promise((resolve) => {
      const writableStream = createWriteStream(fullFilePath);
      writableStream.on('finish', () => {
        console.log(`File '${filename}' successfully created`);
        resolve();
      });
      writableStream.end();
    });
  } catch(err) {
    throw err;
  }
};
