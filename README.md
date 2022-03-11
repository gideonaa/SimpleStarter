# Keep It Simple 🙌

### Simple, minimalist website starter kit with reusable HTML layouts.

How do you build a new site these days? Wordpress is bloated, requires constant security awareness, and maintaining a database is often overkill. Likewise, using a Javascript framework requires dozens of new tools, dependencies and specialization.

#### Ok, so why not just use plain old HTML?

Well, mainly because it sucks to string together and maintain dozens of pages with repeated code for the headers, footer, nav, etc. That's solved here by compiling reusable templates and partials into a set of HTML documents to be deployed as static files.

The result is fast-loading, SEO-friendly, and best of all *easy to maintain* sites.

#### Ok, but why not use Web Components?
Because they're [still not really ready for prime time.](https://caniuse.com/?search=web%20components)

### Why not render templates on the backend with PHP, Django, CoolNewNodeFramework.js, etc?
Because sometimes you just want simple static-hosted pages that load super fast with no learning curve for future maintainers. Besides, nowadays most backend functionality is delivered by 3rd party micro-SaaS APIs that can be integrated with simple AJAX calls that can be easily added to your HTML partials. If you need complex views and strongly-coupled backend functionality, this isn't right for you.

#### Ok, but what packages/libraries are needed to create HTML templates?
The only dependency is [Nunjucks by Mozilla](https://mozilla.github.io/nunjucks/api.html#browser-usage) which is executed using [NodeJS](https://nodejs.org/en/)/[NPM](https://www.npmjs.com/).

#### Ok, but I have content writers who can't write HTML, how do they write articles/blogs?
Check out the WYSIWYG text editor in `admin/index.html`. Load it up online and place the resulting files in the appropriate src content to be compiled into the site pages.

#### What command do I run to compile the content and templates?
`npm run build`

#### What's happening during build?
`build.js` takes files from `src/pages/` and finds the templates they inherit from `src/templates` while applying any partials referenced from `src/templates/partials` to generate simple HTML pages that are placed in `public` for deployment.

#### Ok, but how come you're not building with Glerp, Yulp, Webstack, etc.?
Ok I made those up. But tools like Gulp, Grunt, Yarn, WebPack, etc are just more stuff to remember and maintain. Less is more.

#### How can I learn about Nunjucks syntax for creating pages with templates and partials?
Checkout the [Nunjucks Docs](https://mozilla.github.io/nunjucks/)
Or this [tutorial](https://zellwk.com/blog/nunjucks-with-gulp/) ...but ignore the gulp stuff because why not [just use npm](https://www.freecodecamp.org/news/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8/)

#### Ok, but what is this again?
This repo is a simple and clean scaffolding for popping up new websites with just HTML, CSS and JS as needed. This is a starting point with a few informational pages and a blog.

#### Ok, but I would lay this out a little differently
This structure is *just a suggestion.* Feel free to move things around to your liking. Modify the `build.js` file to place the resulting files where you want them. [Go ahead and fork it.](https://github.com/gideonaa/site-starter/fork)

#### Directory Structure
```
project/
└─ admin/  # optional 'admin' page w/word processor for generating html pages
    ├── admin.css
    └── index.html
└─ public/  # dir containing compiled files for deployment
     ├── about.html
     ├── contact.html
     ├── index.html
     └── blog/
         ├── some-blog-post-12-01-22.html
         └── another-post-12-12-22.html
     └── scripts/
          # put JS files here
     └── styles/
          # put styles here
  └─ src/     
      └── pages/  # main pages content
          ├── index.json
          ├── about.json
          └── contact.json
      └── blog/  # blog content
          ├── some-blog-post-01-01-22.json
          └── my-great-ideas-03-15-22.json
      └── templates/
          ├── _about.njk
          ├── _blog_base.njk # base template for blog posts
          ├── _contact.njk
          ├── _index.njk
          ├── _page_base.njk # base template for pages
          |
          └── macros/        # macros contain basic reusable logic
              └── allow_index.jk
          └── partials/      # reusable html snippets
              └── footer/
                  ├── _copyright.njk
                  ├── _footer_scripts.njk
                  ├── _main_footer.njk
                  └── _site-footer.njk
              └── head/
                  ├── _links.njk
                  ├── _metadata.njk
                  └── _scripts.njk
              └── header/
                  ├── _header.njk
                  └── _blog_header.njk
      ├─ build.js  # script that compiles the page data into templates
      ├─ package.json
      └─ README.md      
```

Note that the page content can be store separately in JSON files and compiled
into the structure layer. This is optional, you can always write content directly into
any .njk file. But keeping structure and content separate provides many advantages
including easier editing and the option of internationalization.


#### Notes

You may use `.html` instead of the `.njk` extension for templates/partials but you must adjust the build script accordingly.

If you want syntax highlighting for Nunjuck template files use a plugin:
- atom https://github.com/alohaas/language-nunjucks
- vim https://github.com/niftylettuce/vim-jinja
- brackets https://github.com/axelboc/nunjucks-brackets
- sublime https://github.com/mogga/sublime-nunjucks/blob/master/Nunjucks.tmLanguage
- emacs http://web-mode.org
- vscode https://github.com/ronnidc/vscode-nunjucks

This repo uses MVP.css for clean base styles without the need for CSS classes https://github.com/andybrewer/mvp/

#### Warning
If the data being compiled into pages is user generated, be sure to set "autoescape" to false in the Nunjucks configuration at build, otherwise unsafe markup may be rendered.
