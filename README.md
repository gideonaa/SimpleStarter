# Stupid Simple Websites

### Simple and minimalist starter kit for new websites using DRY html layout templates.


Starting a new website has become a pain. Wordpress is bloated, full of security concerns, and often overkill and using a Javascript framework requires evaluating a plethora of new tooling, dependencies and specialization.

This repo is a simple and clean scaffolding for popping up new websites with just HTML & CSS (and JS as needed). The problem that usually arises with such a setup is how to avoid writing the same code for the header, footer, etc. across multiple pages. This is solved using just one Node dependency (Nunjucks) to compile reusable templates and partials into a set of html documents to be deployed as static files.

Now we just need to integrate an open source text editor/wysiwyg so non-technical content writers can add pages. Why not [make it happen?](https://github.com/gideonaa/site-starter/fork)

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
          ├── index.njk  # homepage content
          └── page.njk   # site page content
      └── blog/   # blog content
          ├── some-blog-post-12-01-22.njk
          └── another-post-12-12-22.njk
      └── templates/
          ├── index.njk # homepage template
          ├── page.njk  # side page layout
          └── blog.njk  # blog page
          └── partials/
              ├── footer/
              │   ├── _scripts.html
              │   └── _site-footer.html
              ├── head/
              │   ├── _favicons.html
              │   ├── _metadata.html
              │   └── _scripts.html
              └── header/
                  ├── _site-header.html
                  └── _site-nav.html

```

Uses MVP.css for clean base styles with no CSS classes https://github.com/andybrewer/mvp/
