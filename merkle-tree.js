const crypto = require("crypto");

class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves;
    this.tree = this.feed();
  }

  feed = () => {
    const level = this.leaves.map(leaf => {
      return crypto
        .createHash("sha256")
        .update(leaf)
        .digest();
    });

    return [level];
  };

  computeNodes = () => {
    const depth = this.getDepth();

    while (this.tree[0].length > 1) {
      const currentLevel = this.tree[0];
      const nextLevel = [];

      for (let j = 0; j < currentLevel.length; j += 2) {
        // If there's no next node, just push the current hash
        if (!currentLevel[j + 1]) {
          nextLevel.push(currentLevel[j]);
        } else {
          const [currentNode, nextNode] = currentLevel.slice(j, j + 2);
          const newNode = this.hashNodes(currentNode, nextNode);
          nextLevel.push(newNode);
        }
      }

      this.tree.unshift(nextLevel);
    }
  };

  hashNodes = (node1, node2) => {
    return crypto
      .createHash("sha256")
      .update(node1 + node2)
      .digest();
  };

  getDepth = () => {
    return this.tree.length;
  };

  getTree = () => {
    return this.tree;
  };

  getRoot = () => {
    return this.tree[0][0].toString("hex");
  };
}

module.exports = MerkleTree;
