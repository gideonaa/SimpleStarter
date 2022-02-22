const nunjucks = require('nunjucks')
const fs = require('fs');

// tell nunjucks where to find templates
var env = nunjucks.configure(['./','/src/templates/','/src/pages/']);
var extension = '.html' // extension of file output. Set empty quotes for none.

// Loop through all the files in the temp directory
fs.readdir('src/pages/', function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  files.forEach(function (file, index) {
    var inputfile = env.getTemplate('src/pages/' + file);
    var output = inputfile.render();
    console.log('Building file '+file+'...');
    fs.writeFileSync(__dirname +'/public/'+ file.replace('.njk', extension), output);
  });
});




//
//
// try {
//   const files = fs.readdir('/src/pages/', renderFiles(err, files));
//   for (const file of files)
//     console.log(file);
// } catch (err) {
//   console.error(err);
// }
