const nunjucks = require('nunjucks')
const fs = require('fs');
const path = require('path');
const prettify = require('html-prettify');

// build main website files
buildFiles('src/pages/', '.public/');
// build blog files to public/blog, all with the same template
buildFiles('src/blog/', '.public/blog/', 'src/templates/_blog_base.njk');


/** buildFile
Takes the file, finds the corresponding template, and exports the rendered html
document to the chosen directory.
@Params:
input_filepath     - filename of JSON content files
input_dir      - directory of the filename
output_dir     - directory in which to place the resulting html documents
template_path  - the path to the template njk file into which the json content
                 should be rendered. Defaults to null which finds the template
                 based on the json filename w/underscore prepended and .njk ext.
output_ext     - extension of the compiled output file. Defaults to .html (set
                 to '' if you want no extension for cleaner urls but make sure
                 your CDN can handle this properly).
**/
function buildFile(input_filepath, output_dir, template_path=null, output_ext='.html'){
  // fail if not json
  if (path.extname(input_filepath) != ".json"){ thow `${input_filepath} is not JSON` }
  // tell nunjucks where to find templates
  let env = nunjucks.configure(['./','/src/templates/*/**', '/src/templates/'], { autoescape: false });
  // skip files that aren't json
  if (path.extname(input_filepath) != ".json"){ return }
  // read in the data file
  let json = fs.readFileSync(input_filepath,'utf8');
  //get filename
  filename = path.basename(input_filepath)
  // get template file if passed, otherwise look for same filename with .njk ext
  let tmpl_path = template_path ? template_path : `src/templates/_${filename.replace('.json', '.njk')}`;
  let tmpl = env.getTemplate(tmpl_path);
  // render the page final page
  let outfile = tmpl.render(JSON.parse(json));
  let full_out_path = `${__dirname}/${output_dir}${filename.replace('.json', output_ext)}`
  fs.writeFileSync(full_out_path,  prettify(outfile));
  //fs.writeFileSync(full_out_path, outfile);
  console.log(`
  ============
  Built content file ${input_filepath}...
  - Using template ${tmpl_path},
  - Output to ${full_out_path}
  ============ `)
}

// Runs the above builFile on a directory of files, skipping non-JSON files
// Same params as builFile but with input dir instead of file path
// Note: exclude leading / from file path, assumed to run from project root
function buildFiles(input_dir, output_dir, template_path=null, output_ext='.html'){
  // get the json content files from input dir
  let files = fs.readdirSync(input_dir);
  // process each file
  files.forEach(file => {
    let input_filepath = input_dir+file;
    // skip files that aren't json
    if (path.extname(input_filepath) != ".json"){ return }
    // build the file
    buildFile(input_filepath, output_dir, template_path, output_ext)
   });
}
