import { normalize } from 'node:path';
import { getUserHomedir } from "../utils/path.js";

let currentPath = getUserHomedir();

export const showWhereIAm = () => { console.log(`You are currently in ${getCurrentPath()}`) };

export const up = () => {
  currentPath = normalize(currentPath + '/..');
};

export const getCurrentPath = () => currentPath;
