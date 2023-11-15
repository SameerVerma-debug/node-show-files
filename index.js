#!/usr/bin/env node
const fs = require("fs"); //file system object
const chalk = require('chalk');
const path = require('path');

//Option 2(promisifying lstat)
//Method #1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject();
//       }
//       else {
//         resolve(stats);
//       }
//     })
//   })
// }

//Method #2
//const lstat = util.promisify(fs.lstat);

//Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

//process module is already added by default
fs.readdir(targetDir, async (err, filenames) => {
  //err === an error object, if something went wrong
  //OR
  //err === null, if everything is alright
  if (err) {
    console.log(err);
  }

  const statPromises = [];
  for (let filename of filenames) {
    statPromises.push(lstat(path.join(targetDir,filename)));
  }

  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    const filename = filenames[index];
    if (stats.isDirectory()) {
      console.log(chalk.bold.red(filename));
    } else {
      console.log(filename);
    }
  }
});
