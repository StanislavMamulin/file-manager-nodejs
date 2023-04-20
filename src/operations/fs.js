import { stat } from 'node:fs/promises';

export const isPathExists = async (path) => {
  try {
    const info = await stat(path);
    return true;
  } catch(err) {
    return false;
  }
}

export const isFolder = async (path) => {
  try {
    const info = await stat(path);
    
    if (info.isDirectory()) {
      return true;
    }

    return false;
  } catch(err) {
    throw err;
  }
}

export const checkCdPath = async (path) => {
  try {
    const pathExists = await isPathExists(path);
    if (!pathExists) {
      throw new Error('No such file or directory');
    }

    const isDirectory = await isFolder(path);
    if (!isDirectory) {
      throw new Error('Not a directory');
    }

    return true;
  } catch(err) {
    throw err;
  }
}
