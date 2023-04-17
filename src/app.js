import { showWhereIAm, up } from './operations/navigation.js';
import { createInterface } from 'node:readline';
import { getUserName, showGoodbay, showGreeting } from './utils/user.js';

const inputHandler = (line, rl) => {
  switch (line) {
    case '.exit':
      rl.close();
      return;
    case 'up':
      up();
      break;
    default:
      console.log('Invalid input');
      return;
  }

  showWhereIAm();
}

const app = () => {
  const userName = getUserName();
  showGreeting(userName);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => inputHandler(line, rl));
  rl.on('close', () => { showGoodbay(userName); });
};

app();