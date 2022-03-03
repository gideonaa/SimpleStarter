# Stupid Simple Websites

### Simple and minimalist starter kit for new websites using DRY html layout templates.


Starting a new website has become a pain. Wordpress is bloated, has security concerns, requires a database and is often overkill while using a Javascript framework requires evaluating a plethora of new tooling, dependencies and specialization.

This repo is a simple and clean scaffolding for popping up new websites with just HTML & CSS (and JS as needed). The problem that usually arises with such a setup is how to avoid writing the same code for the header, footer, etc. across multiple pages. This is solved using just one Node dependency (Nunjucks) to compile reusable templates and partials into a set of html documents to be deployed as static files.

This results in fast-loading, SEO-friendly, and best of all *easy to maintain* sites. Now we just need to integrate an open source text editor/wysiwyg so non-technical content writers can add pages. Why not [make it happen?](https://github.com/gideonaa/site-starter/fork)

#### Dependencies
- [NodeJS](https://nodejs.org/en/)/[NPM](https://www.npmjs.com/)
- [Nunjucks by Mozilla](https://mozilla.github.io/nunjucks/api.html#browser-usage)

#### How to build
`npm run build`

#### How does the build happen?
`build.js` takes files from `src/pages/` and finds the templates they inherit from `src/templates` while applying any partials referenced from `src/templates/partials` to generate simple HTML pages that are placed in `public` for deployment.

#### How can I learn about Nunjucks syntax for creating pages with templates and partials?
Checkout the [Nunjucks Docs](https://mozilla.github.io/nunjucks/)
Or this [tutorial](https://zellwk.com/blog/nunjucks-with-gulp/) ...but ignore the gulp stuff because why not [just use npm](https://www.freecodecamp.org/news/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8/)

### Why not render templates on the backend with PHP, Django, CoolNewNodeFramework.js, etc?
Because sometimes you just want simple static-hosted pages that load super fast with no learning curve for future maintainers. Besides, nowadays most backend functionality is delivered by 3rd party micro-SaaS APIs that can be integrated with simple AJAX calls that can be easily added to your HTML partials. If you need complex views and strongly-coupled backend functionality, this isn't right for you.

#### Directory Structure
```
project/
  |- public/  # dir containing compiled files for deployment
     └── about.html
     ├── contact.html
     ├── index.html
     └── blog/
         ├── some-blog-post-12-01-22.html
         └── another-post-12-12-22.html
  |- src/     
      └── pages/
          ├── index.njk    # home page elements
          ├── index.json   # home page content
          ├── about.njk
          ├── about.json
          ├── contact.njk
          └── contact.json
      └── blog/    
          ├── some-blog-post-12-01-22.json # blog content
          └── my-great-ideas-12-12-22.json
      └── templates/
          ├── _index.njk # home page template
          ├── _page.njk  # site page template (about, contact, etc)
          ├── _blog.njk  # blog page template
          └── partials/
              ├── footer/
              │   ├── _scripts.html
              │   └── _site-footer.html
              ├── head/
              │   ├── _favicons.html
              │   ├── _metadata.html
              │   └── _scripts.html
              └── header/
                  ├── _main-header.html
                  └── _blog-header.html

```
Note that the page content can be store separately in JSON files and compiled
into the structure layer. This is optional, you can always write content directly into
any .njk file. But keeping structure and content separate provides many advantages
including easier editing and the option of internationalization.

Also note that while the homepage (index), about and contact pages may have unique
#### Notes
You may use `.html` instead of the `.njk` extension for templates/partials.
If you want syntax highlighting for template files use a plugin:
- atom https://github.com/alohaas/language-nunjucks
- vim https://github.com/niftylettuce/vim-jinja
- brackets https://github.com/axelboc/nunjucks-brackets
- sublime https://github.com/mogga/sublime-nunjucks/blob/master/Nunjucks.tmLanguage
- emacs http://web-mode.org
- vscode https://github.com/ronnidc/vscode-nunjucks
This repo uses MVP.css for clean base styles without the need for CSS classes https://github.com/andybrewer/mvp/

#### Warning
If the data being compiled into pages is user generated, be sure to set "autoescape" to false in the Nunjucks configuration at build, otherwise unsafe markup may be rendered.
