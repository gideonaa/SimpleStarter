const nunjucks = require('nunjucks')
const fs = require('fs');
const path = require('path');

// build main website files
buildFiles('src/pages/', 'public/');
// build blog files to public/blog, all with the same template
buildFiles('src/blog/', 'public/blog/', 'src/templates/_blog.njk');


/** buildFiles
Takes the content files from the input directory, finds the corresponding
template, and exports the rendered html document to the chosen directory.
Note: exclude leading / from file path, assumed to run from project root
@Params:
input_dir      - directory of JSON content files
output_dir     - directory in which to place the resulting html documents
template_path  - the path to the template njk file into which the json content
                 should be rendered. Defaults to null which finds the template
                 based on the json filename w/underscore prepended and .njk ext.
output_ext     - extension of the compiled output files. Defaults to .html (set
                 to '' if you want no extension for cleaner urls but make sure
                 your CDN can handle this properly).
**/
function buildFiles(input_dir, output_dir, template_path=null, output_ext='.html'){
  // tell nunjucks where to find templates
  var env = nunjucks.configure(['./','/src/templates/*/**', '/src/templates/'], { autoescape: false });
  // get the json content files from input dir
  var files = fs.readdirSync(input_dir);
  // process each file
  files.forEach(file => {
    if (path.extname(`${input_dir}${file}`) != ".json"){ return; }
    // read in the data file
    console.log(`Building file ${file}...`)
    var json = fs.readFileSync(`${input_dir}${file}`,'utf8');
    // get associated template file
    var tmpl_path = template_path ? template_path : `src/templates/_${file.replace('.json', '.njk')}`;
    var tmpl = env.getTemplate(tmpl_path);
    // render the page final page
    var outfile = tmpl.render(JSON.parse(json));
    fs.writeFileSync(
      `${__dirname}/${output_dir}${file.replace('.json', output_ext)}`, outfile
     );
   });
}
