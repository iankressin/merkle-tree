const fs = require("fs");

class FileHandler {
  readFile = (path, cb) => {
    const chunks = [];
    const readStream = fs.createReadStream(path, {
      highWaterMark: 1024 * 1024
    });

    readStream.on("data", chunk => chunks.push(chunk));

    readStream.on("end", () => cb(chunks));
  };
}

module.exports = new FileHandler();
