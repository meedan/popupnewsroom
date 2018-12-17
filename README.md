# This is a build system for [Popup.news](https://popup.news)

This environment uses Jekyll with Contentful. It uses Contentful's [Jekyll-Contentful-Data-Import](https://github.com/contentful/jekyll-contentful-data-import) plugin. 

## Quick start
1. Install Ruby 2.x (eg with [rvm](https://rvm.io))
2. `bundle install` to install all the packages
3. Add Contentful Space and Access Token variables to your shell's configuration file (.bashrc or .bash_profile):

```
export CONTENTFUL_PN_SPACE_ID=abc123
export CONTENTFUL_PN_ACCESS_TOKEN=abc123
export CONTENTFUL_ENVIRONMENT=develop
```

Variables are set in the contentful section of `_config.yml`. Get your Contentful space id and access token using the Contentful web app. Open the space that you want to access (the top left corner lists all spaces), and navigate to the *Settings > API keys*. Select the *API keys* option and there should be an existing API key under *Microsite* for Popup.news.
  
And run `source ~/.bashrc` or open new terminal to enable changes.

4. `jekyll contentful --rebuild` to build the site by fetching content from Contentful 
5. `jekyll serve` to serve the site at [http://127.0.0.1:4000](http://127.0.0.1:4000)
6. Edit .scss, .html and .js files. The browser should live-reload.