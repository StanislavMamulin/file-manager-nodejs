import { showWhereIAm } from '../operations/navigation.js';

export const getUserName = (args) => {
  const userName = args[0].split('=')[1];

  return userName;
}

export const showGreeting = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  showWhereIAm();
}

export const showGoodbay = (userName) => { console.log(`Thank you for using File Manager, ${userName}, goodbye!`); };
export const INCORRECT_START_PARAMETERS_MESSAGE = 'Must be run with parameters in the following format\n npm run start -- --username=your_username';
