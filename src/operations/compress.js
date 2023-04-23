import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname } from 'node:path';

import { getAbsolutePath } from './navigation.js';
import { checkFileExist, isPathExists } from './fs.js';

const archiever = async (srcPath, destPath, operation, successMessage) => {
  try {
    const fullSrcPath = getAbsolutePath(srcPath);
    await checkFileExist(fullSrcPath);
    
    const fullDestPath = getAbsolutePath(destPath);
    const isDestinationDirExists = await isPathExists(dirname(fullDestPath));
    if (!isDestinationDirExists) {
      throw new Error('Destination directory does not exist');
    }

    const source = createReadStream(fullSrcPath);
    const destination = createWriteStream(fullDestPath);

    return new Promise((resolve, reject) => {
      pipeline(source, operation, destination, (err) => {
        if (err) {
          reject('Archive operation error');
        } else {
          resolve(successMessage);
        }
      });
    });
  } catch(err) {
    throw err;
  }
}

export const compress = async (filePath, destPath) => {
  try {
    const successMessage = 'Archive created';
    return archiever(filePath, destPath, createBrotliCompress(), successMessage);
  } catch(err) {
    throw err;
  }
};
