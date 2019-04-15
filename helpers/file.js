const fs = require('fs');
const file = {
  readFile: (filePath) => {
    let promise = new Promise((resolve, reject) => {
      if (!filePath) {
        reject('file path can not be empty');
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.toString());
      });
    });
    return promise;
  },
  write: (filePath, content, append) => {
    let promise = new Promise((resolve, reject) => {
      if (!filePath) {
        reject('file path can not be empty');
      }
      fs.writeFile(
        filePath,
        content,
        {
          flag: append ? 'a' : 'w'
        },
        (err) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        }
      );
    });
    return promise;
  }
};
module.exports = file;
