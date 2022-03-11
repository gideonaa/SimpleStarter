const nunjucks = require('nunjucks')
const fs = require('fs');
const path = require('path');
var formatter = require('html-formatter');

// build main website files
buildFiles('src/pages/', 'public/');
// build blog files to public/blog, all with the same template
buildFiles('src/blog/', 'public/blog/', 'src/templates/_blog_base.njk');


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
  let env = nunjucks.configure(['./','/src/templates/*/**', '/src/templates/'], { autoescape: false });
  // get the json content files from input dir
  let files = fs.readdirSync(input_dir);
  // process each file
  files.forEach(file => {
    let full_path = input_dir+file;
    if (path.extname(full_path) != ".json"){ return; }
    // read in the data file
    let json = fs.readFileSync(full_path,'utf8');
    // get associated template file
    let tmpl_path = template_path ? template_path : `src/templates/_${file.replace('.json', '.njk')}`;
    let tmpl = env.getTemplate(tmpl_path);
    // render the page final page
    let outfile = tmpl.render(JSON.parse(json));
    let full_out_path = `${__dirname}/${output_dir}${file.replace('.json', output_ext)}`
    fs.writeFileSync(full_out_path,  formatter.render(outfile));
    console.log(`
    ============
    Built content file ${full_path}...
    - Using template ${tmpl_path},
    - Output to ${full_out_path}
    ============ `)
   });
}
