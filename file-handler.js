const fs = require("fs");
const chunks = require("buffer-chunks");

module.exports = (file, cb) => {
  if (typeof file === Buffer) {
    const buffList = chunks(file, 1024);

    console.log(buffList);

    cb(buffList);

    return;
  }

  const chunks = [];
  const readStream = fs.createReadStream(file, {
    highWaterMark: 1024 * 1024
  });

  readStream.on("data", chunk => chunks.push(chunk));

  readStream.on("end", () => cb(chunks));
};
