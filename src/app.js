import { cd, showWhereIAm, up } from './operations/navigation.js';
import { createInterface } from 'node:readline';
import { getUserName, showGoodbay, showGreeting } from './utils/user.js';
import { catFile, createFile } from './operations/files.js';

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