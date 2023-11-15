const fs = require("fs"); //file system object

//process module is already added by default
fs.readdir(process.cwd(), (err, filenames) => {
  //err === an error object, if something went wrong
  //OR
  //err === null, if everything is alright
  if (err) {
    console.log(err);
  }
  console.log(filenames);
});
