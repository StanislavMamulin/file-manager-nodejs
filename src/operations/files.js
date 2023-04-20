import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { checkFileExist } from './fs.js';
import { getCurrentPath } from './navigation.js';

export const catFile = async (filepath) => {
  try {
    const fullFilePath = resolve(getCurrentPath(), filepath);
    await checkFileExist(fullFilePath);

    const fileContent = await readFile(fullFilePath, { encoding: 'utf-8' });
    console.log(fileContent);
  } catch(err) {
    throw err;
  }
};