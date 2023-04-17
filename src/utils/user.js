import { showWhereIAm } from '../operations/navigation.js';

export const getUserName = () => {
  const args = process.argv.slice(2);
  const userName = args[0].split('=')[1];

  return userName;
}

export const showGreeting = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  showWhereIAm();
}

export const showGoodbay = (userName) => { console.log(`Thank you for using File Manager, ${userName}, goodbye!`); };