const ResumeParser = require("./src");

const fileDir = process.cwd() + "/files/";

const resume = new ResumeParser(
  "https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf"
);
// const resume = new ResumeParser(fileDir + "resume.pdf");

console.log(resume.parseToFile(fileDir + "compiled").then(console.log));
console.log(resume.parseToJSON(fileDir).then(console.log));
console.log(resume.parseToJSON(fileDir).then(console.log));
