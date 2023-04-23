import { createReadStream } from 'node:fs';
import { checkFileExist } from './fs.js';
import { getAbsolutePath } from './navigation.js';
const { createHash } = await import('node:crypto');

export const calculateHash = async (filepath) => {
    try {
      const fullPath = getAbsolutePath(filepath);
      await checkFileExist(fullPath);

      const hash = createHash('sha256');
      const fileStream = createReadStream(fullPath);

      return new Promise((resolve) => {
        fileStream.on('readable', () => {
          const data = fileStream.read();
          if (data) {
            hash.update(data);
          } else {
            resolve(hash.digest('hex'));
          }
        })
      })

    } catch(err) {
      throw err;
    }
};
