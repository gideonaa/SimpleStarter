const nunjucks = require('nunjucks')
const fs = require('fs');
const path = require('path');

// tell nunjucks where to find templates
var env = nunjucks.configure(['./','/src/templates/','/src/pages/'], { autoescape: false });
// Set extension of compiled output file. Use empty quotes for no extension.
var extension = '.html'

// Loop through all the files and render them
fs.readdir('src/pages/', function (err, files) {
  // handle errors reading dir
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  files.forEach(file => {
    //var filepath = 'src/pages/'+file;
    if (path.extname(`src/pages/${file}`) == ".njk"){
      // get the input njk file to be compiled
      console.log(`**Building file ${file}`)
      var inputfile = env.getTemplate(`src/pages/${file}`);
      // get associated json data file, if applicable
      var datafile;
      try {
        json = `src/pages/`+file.replace('.njk', '.json');
        data = fs.readFileSync(json,'utf8');
      } catch (err) {
        console.log(`No JSON content file associated with ${file}`)
        data = null;
      }
      // render the page/template/input data into a var
      var outputfile = inputfile.render(JSON.parse(data));
      // write the data to the file system
      // TODO make work for non .njk files
      fs.writeFileSync(`${__dirname}/public/${file.replace('.njk', extension)}`, outputfile);
    }
  });
});
