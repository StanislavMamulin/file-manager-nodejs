import { cd, listFolderContent, up } from './operations/navigation.js';
import { catFile, copyMoveFile, createFile, deleteFile, renameFile } from './operations/files.js';
import { checkNumberOfParameters } from './utils/helpers.js';
import { getOsInfo } from './operations/os.js';
import { calculateHash } from './operations/hash.js';
import { compress, decompress } from './operations/compress.js';


const operations = {
  'up': (params) => {
    checkNumberOfParameters(params, 0);
    up();
  },
  'cd': async (params) => {
    checkNumberOfParameters(params, 1);
    const [newPath] = params;
    await cd(newPath);
  },
  'ls': async (params) => {
    checkNumberOfParameters(params, 0);

    const folderContent = await listFolderContent();
    console.table(folderContent);
  },
  'cat': async (params) => {
    checkNumberOfParameters(params, 1);

    const [readFilePath] = params;
    const filecontent = await catFile(readFilePath);
    console.log(filecontent);
  },
  'add': async (params) => { 
    checkNumberOfParameters(params, 1);
    const [filename] = params;
    await createFile(filename);
  },
  'rn': async (params) => {
    checkNumberOfParameters(params, 2);

    const [oldName, newName] = params;
    await renameFile(oldName, newName);
  },
  'cp': async (params) => {
    checkNumberOfParameters(params, 2);

    const [filepath, newDirectoryPath] = params;
    await copyMoveFile({ filepath, newDirectoryPath, isMove: false });
  },
  'mv': async (params) => {
    checkNumberOfParameters(params, 2);

    const [moveFilepath, moveToPath] = params;
    await copyMoveFile({ filepath: moveFilepath, newDirectoryPath: moveToPath, isMove: true });
  },
  'rm': async (params) => {
    checkNumberOfParameters(params, 1);

    const [filePath] = params;
    await deleteFile(filePath);
  },
  'os': async (params) => {
    checkNumberOfParameters(params, 1);

    const [neededInfo] = params;
    const info = await getOsInfo(neededInfo);
    console.log(info);
  },
  'hash': async (params) => {
    checkNumberOfParameters(params, 1);

    const [hashFilePath] = params;
    const hash = await calculateHash(hashFilePath);
    console.log(hash);
  },
  'compress': async (params) => {
    checkNumberOfParameters(params, 2);

    const [compressFilePath, archivePath] = params;
    const result = await compress(compressFilePath, archivePath);
    console.log(result);
  },
  'decompress': async (params) => {
    checkNumberOfParameters(params, 2);

    const [archiveFilePath, destinationPath] = params;
    const decompressResult = await decompress(archiveFilePath, destinationPath);
    console.log(decompressResult);
  },
  'default': () => { console.log('Invalid input'); }
};

export const controller = async (command, params) => {
  if (operations.hasOwnProperty(command)) {
    await operations[command](params);
  } else {
    operations['default']();
  }
}
