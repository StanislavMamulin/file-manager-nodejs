import { cd, showWhereIAm, up } from './operations/navigation.js';
import { createInterface } from 'node:readline';
import { getUserName, showGoodbay, showGreeting } from './utils/user.js';
import { catFile, copyMoveFile, createFile, deleteFile, renameFile } from './operations/files.js';
import { checkNumberOfParameters } from './utils/helpers.js';
import { getOsInfo } from './operations/os.js';
import { calculateHash } from './operations/hash.js';

const inputHandler = async (line, rl) => {
  const [command, ...params] = line.split(' ');
  try {
    switch (command) {
      case '.exit':
        rl.close();
        return;
      case 'up':
        up();
        break;
      case 'cd':
        await cd(params[0]);
        break;
      case 'cat':
        await catFile(params[0]);
        break;
      case 'add':
        await createFile(params[0]);
        break;
      case 'rn':
        checkNumberOfParameters(params, 2);

        const [oldName, newName] = params;
        await renameFile(oldName, newName);
        break;
      case 'cp':
        checkNumberOfParameters(params, 2);

        const [filepath, newDirectoryPath] = params;
        await copyMoveFile({ filepath, newDirectoryPath, isMove: false });
        break;
      case 'mv':
        checkNumberOfParameters(params, 2);

        const [moveFilepath, moveToPath] = params;
        await copyMoveFile({ filepath: moveFilepath, newDirectoryPath: moveToPath, isMove: true });
        break;
      case 'rm':
        checkNumberOfParameters(params, 1);

        const [filePath] = params;
        await deleteFile(filePath);

        break;
      case 'os':
        checkNumberOfParameters(params, 1);

        const [neededInfo] = params;
        const info = await getOsInfo(neededInfo);
        console.log(info);

        break;
      case 'hash':
        checkNumberOfParameters(params, 1);

        const [hashFilePath] = params;
        const hash = await calculateHash(hashFilePath);
        console.log(hash);

        break;
      default:
        console.log('Invalid input');
        return;
    }

    showWhereIAm();
  } catch(err) {
    console.error(`Operation failed: ${err.message}`);
  }
  
}

const app = () => {
  const userName = getUserName();
  showGreeting(userName);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    if (line) {
      inputHandler(line, rl);
    }
  });
  rl.on('close', () => { showGoodbay(userName); });
};

app();