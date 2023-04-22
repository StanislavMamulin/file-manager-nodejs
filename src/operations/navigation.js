import { normalize, resolve } from 'node:path';
import { getUserHomedir } from "../utils/path.js";
import { checkCdPath } from './fs.js';

let currentPath = getUserHomedir();

export const showWhereIAm = () => { console.log(`% You are currently in ${getCurrentPath()}`) };

export const up = () => {
  currentPath = normalize(currentPath + '/..');
};

export const cd = async (newPath) => {
  const wishPath = resolve(currentPath, newPath || getUserHomedir());

  try {
    await checkCdPath(wishPath);

    currentPath = wishPath;
  } catch(err) {
    throw err;
  }
};

export const getCurrentPath = () => currentPath;
export const getAbsolutePath = (path) => resolve(getCurrentPath(), path);
