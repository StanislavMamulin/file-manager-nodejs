import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

export const getOsInfo = async (infoType) => {
  const type = infoType.slice(2)
  switch(type) {
    case 'EOL':
      return JSON.stringify(EOL);
    case 'cpus':
      const cpuInfo = cpus();
      const cpusAmount = cpuInfo.length;
      const cpusInfo = cpuInfo.map(
        (info, index) => `CPU #${index + 1}:\n Model: ${info.model}\n Speed: ${info.speed/1000} GHz`
      ).join('\n');

      return `Total CPU: ${cpusAmount}\n${cpusInfo}`;
    case 'homedir':
      return homedir();
    case 'username':
      return userInfo().username;
    case 'architecture':
      return arch();
    default:
      throw new Error('Invalid operation parameters');
  }
}
