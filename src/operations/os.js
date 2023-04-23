import { EOL } from 'node:os';

export const getOsInfo = async (infoType) => {
  const type = infoType.slice(2).toLowerCase();
  switch(type) {
    case 'eol':
      return JSON.stringify(EOL);
    default:
      throw new Error('Invalid operation parameters');
  }
}
