var ParseBoy = require("./ParseBoy");
var processing = require("./libs/processing");
var logger = require("tracer").colorConsole();

var parser = {
  parseToJSON: function(path, type, cbAfterParse) {
    const objParseBoy = new ParseBoy();
    if (type === "url") {
      processing.runUrl(path, (preppedFile, error) => {
        return objParseBoy.parseUrl(preppedFile, parsedResume =>
          cbAfterParse(parsedResume, error)
        );
      });
    } else {
      processing.runFile(path, (preppedFile, error) => {
        objParseBoy.parseFile(preppedFile, parsedResume =>
          cbAfterParse(parsedResume, error)
        );
      });
    }
  },
  parseToFile: function(path, type, savePath, cbAfterParse) {
    const objParseBoy = new ParseBoy();
    const storeFile = (preppedFile, Resume, savePath, cbAfterParse) => {
      objParseBoy.storeResume(preppedFile, Resume, savePath, function(err) {
        if (err) {
          logger.error("Resume " + preppedFile.name + " errored", err);
          return cbAfterParse(null, "Resume " + preppedFile.name + " errored");
        }
        logger.trace("Resume " + preppedFile.name + " saved");
        return cbAfterParse(preppedFile.name);
      });
    };

    if (type === "url") {
      processing.runUrl(path, (preppedFile, error) => {
        if (preppedFile) {
          objParseBoy.parseUrl(preppedFile, resume =>
            storeFile(
              new processing.PreparedFile(path.split("/").pop(), preppedFile),
              resume,
              savePath,
              cbAfterParse
            )
          );
        }
      });
    } else {
      processing.runFile(path, (preppedFile, error) => {
        if (preppedFile) {
          objParseBoy.parseFile(preppedFile, resume =>
            storeFile(preppedFile, resume, savePath, cbAfterParse)
          );
        }
      });
    }
  }
};
module.exports = parser;
