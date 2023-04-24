import { createInterface } from 'node:readline';
import { showWhereIAm } from './operations/navigation.js';
import { getUserName, showGoodbay, showGreeting } from './utils/user.js';
import { controller } from './controller.js';

const inputHandler = async (line, rl) => {
  const [command, ...params] = line.split(' ');
  if (command === '.exit') {
    rl.close();
    return;
  }

  try {
    await controller(command, params);

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
