import { readFile, rename, rm } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { checkCdPath, checkFileExist, isContainPath, isPathExists } from './fs.js';
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

export const copyMoveFile = async ({ filepath, newDirectoryPath, isMove }) => {
  try {
    const srcFilename = path.basename(filepath);
    const fullSrcPath = getAbsolutePath(filepath);
    const fullDirPath = getAbsolutePath(newDirectoryPath);
    const fullNewPath = path.join(fullDirPath, srcFilename);

    await checkFileExist(fullSrcPath);
    await checkCdPath(fullDirPath);
    const dstFileExist = await isPathExists(fullNewPath);
    if (dstFileExist) {
      throw new Error('The file already exists in the destination folder');
    }

    const writer = createWriteStream(fullNewPath);

    return new Promise((resolve) => {
      createReadStream(fullSrcPath).pipe(writer);
      writer.on('finish', async () => {

        if (isMove) {
          await rm(fullSrcPath);
          console.log('Move completed')
        } else {
          console.log('Copy completed');
        }

        resolve();
      })
    });
  } catch(err) {
    throw err;
  }
}
