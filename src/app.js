import { createInterface } from 'node:readline';
import { showWhereIAm } from './operations/navigation.js';
import { INCORRECT_START_PARAMETERS_MESSAGE, getUserName, showGoodbay, showGreeting } from './utils/user.js';
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
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(INCORRECT_START_PARAMETERS_MESSAGE)
    return;
  }

  const userName = getUserName(args);
  if (!userName) {
    console.log(INCORRECT_START_PARAMETERS_MESSAGE)
    return;
  }
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
