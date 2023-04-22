import { readFile, rename } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { checkFileExist, isContainPath, isPathExists } from './fs.js';
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

export const renameFile = async (oldPath, newPath) => {
  try {
    if (isContainPath(newPath)) {
      throw new Error('The new name must not contain the path, only the new filename');
    }

    const fullOldPath = getAbsolutePath(oldPath);
    const fullNewPath = path.join(path.dirname(fullOldPath), newPath);

    const isSourceExist = await isPathExists(fullOldPath);
    if (!isSourceExist) {
      throw new Error('Source file does not exists');
    }
    const isDestinationExist = await isPathExists(fullNewPath);
    if (isDestinationExist) {
      throw new Error('Destination object already exists, choose another new name');
    }

    await rename(fullOldPath, fullNewPath);
  } catch(err) {
    throw err;
  }
};
