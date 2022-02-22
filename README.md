** Stupid Simple Websites **


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


<!-- MVP.css quickstart template: https://github.com/andybrewer/mvp/ -->
