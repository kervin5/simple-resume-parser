const ResumeParser = require("./src");

const fileDir = process.cwd() + "/files/";
ResumeParser.parseResumeFile(fileDir + "resume.pdf", fileDir + "compiled") //input file, output dir
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log("parseResume failed");
    console.error(error);
  });

// ResumeParser.parseResumeUrl("https://www.w3.org/TR/PNG/iso_8859-1.txt") // url
//   .then(data => {
//     console.log("Yay! ", data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
