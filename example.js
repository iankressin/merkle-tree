const Verifier = require("./index");
const fs = require("fs");

const server = new Verifier("./package.json");

server.getHash(function(hash) {
  const client = new Verifier("./package.json");
  client.verify(hash, res => console.log());
});

server.getHash(function(hash) {
  fs.readFile("./package.json", (err, file) => {
    if (err) console.log(err);

    const client = new Verifier(file);
    // client.verify(hash, res => console.log(res));
    console.log(file);
  });
});
