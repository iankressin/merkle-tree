const MerkleTree = require("./merkle-tree");
const fileHandler = require("./file-handler");

function Verifier(file) {
  this.file = file;
}

Verifier.prototype.verify = function(rootHash, cb) {
  fileHandler(this.file, function(chunks) {
    const merkle = new MerkleTree(chunks);
    merkle.computeNodes();
    fileHash = merkle.getRoot();

    cb(fileHash === rootHash);
  });
};

Verifier.prototype.getHash = function(cb) {
  fileHandler(this.file, function(chunks) {
    const merkle = new MerkleTree(chunks);
    merkle.computeNodes();
    fileHash = merkle.getRoot();

    cb(fileHash);
  });
};

module.exports = Verifier;
