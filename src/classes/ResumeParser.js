const parseIt = require("../utils/parseIt");

class ResumeParser {
  constructor(filePath) {
    if (!filePath) {
      throw new Error("A file path or URL is required");
    }
    if (filePath.startsWith("http") || filePath.startsWith("https")) {
      this.type = "url";
    } else {
      this.type = "file";
    }

    this.path = filePath;
  }

  parseToJSON() {
    return new Promise((resolve, reject) => {
      parseIt.parseResumeUrl(this.path, function(file, error) {
        if (error) {
          return reject(error);
        }
        return resolve(file);
      });
    });
  }

  parseToFile(outputPath) {
    return new Promise((resolve, reject) => {
      parseIt.parseResumeFile(this.path, outputPath, function(file, error) {
        if (error) {
          return reject(error);
        }
        return resolve(file);
      });
    });
  }
}

module.exports = ResumeParser;
