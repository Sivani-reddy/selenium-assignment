const fs = require("fs/promises");

class FileSystem {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readFile() {
    return await fs.readFile(this.filePath, "utf-8");
  }
}

module.exports = FileSystem;
