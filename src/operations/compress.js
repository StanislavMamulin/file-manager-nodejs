import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';

import { getAbsolutePath } from './navigation.js';
import { checkFileExist, isPathExists } from './fs.js';
import { dirname } from 'node:path';

export const compress = async (filePath, destPath) => {
  try {
    const fullFilePath = getAbsolutePath(filePath);
    await checkFileExist(fullFilePath);
    
    const fullDestPath = getAbsolutePath(destPath);
    const isDestinationDirExists = await isPathExists(dirname(fullDestPath));
    if (!isDestinationDirExists) {
      throw new Error('Destination directory does not exist');
    }

    const compressor = createBrotliCompress();
    const source = createReadStream(fullFilePath);
    const destination = createWriteStream(fullDestPath);

    return new Promise((resolve, reject) => {
      pipeline(source, compressor, destination, (err) => {
        if (err) {
          reject('Error creating archive');
        } else {
          resolve('Archive created!');
        }
      });
    });
  } catch(err) {
    throw err;
  }
};
