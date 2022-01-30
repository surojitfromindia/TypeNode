//this module is serve files

import * as fs from 'fs';
import { Response } from 'express';
import { PathLike } from 'fs';
const serverHugeFile = async (fileName: string, res: Response) => {
  try {
    const readStream = fs.createReadStream('./src/static/'+fileName, {
      autoClose: true,
     highWaterMark: 70,
    });

    //create a stream
    readStream.on('data', (chunk) => {
      res.write(chunk);
    });

    readStream.on('end', () => {
      res.end();
      readStream.destroy()
    });
  } catch (err) {
    console.log(err);
  }
};

export { serverHugeFile };
