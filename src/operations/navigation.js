import { normalize, resolve } from 'node:path';
import { readdir } from 'node:fs/promises';
import { getUserHomedir } from "../utils/path.js";
import { checkCdPath } from './fs.js';
import { sortFolderContent } from '../utils/helpers.js';

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

export const listFolderContent = async () => {
  try {
    const contentDirents = await readdir(getCurrentPath(), { withFileTypes: true });
    const content = contentDirents.map((dirent) => ({
      name: dirent.name,
      type: dirent.isFile() ? 'file' : 'directory',
    }));
    const sortedContent = sortFolderContent(content);

    return sortedContent;
  } catch(err) {
    throw err;
  }
};

export const getCurrentPath = () => currentPath;
export const getAbsolutePath = (path) => resolve(getCurrentPath(), path);
