# This is a build system for [Popup.news](https://popup.news)

This environment uses Jekyll with Contentful. It uses Contentful's [Jekyll-Contentful-Data-Import](https://github.com/contentful/jekyll-contentful-data-import) plugin. See the readme on the repository page to learn how to configure data import.

## Quick start
1. Install Ruby 2.x (eg with [rvm](https://rvm.io))
2. `bundle install` to install all the packages
3. Add Contentful Space and Access Token variables to your shell's configuration file (.bashrc or .bash_profile):

```
export CONTENTFUL_PN_SPACE_ID=abc123
export CONTENTFUL_PN_ACCESS_TOKEN=abc123
export CONTENTFUL_ENVIRONMENT=develop
```

Variables are set in the contentful section of `_config.yml`. Get your Contentful space id and access token using the [Contentful web app](https://app.contentful.com/). Open the space that you want to access (the top left corner lists all spaces), and navigate to the *Settings > API keys*. Select the *API keys* option and there should be an existing API key under *Microsite* for Popup.news.
  
And run `source ~/.bashrc` or open new terminal to enable changes.

4. `jekyll contentful --rebuild` to build the site by fetching content from Contentful 
5. `jekyll serve` to serve the site at [http://127.0.0.1:4000](http://127.0.0.1:4000)
6. Edit .scss, .html and .js files. The browser should live-reload.

## Page Generation from Contentful Data

To generate pages in Jekyll based on Contentful data we are using the [jekyll-datapage_gen](https://github.com/avillafiorita/jekyll-datapage_gen) plugin. Specify in `_config.yml` the data files for which you want individual page to be generated. See plugin's documentation and our `config.yml` for the settings.

For Popupnewsroom, we are generating newsroom and landing pages. For newsroom, it takes the layout template `newsroom.html` and automatically generates pages based on the entries in `newsrooms.yaml` that were imported from Contentful. 

## Contentful Space Environment: Develop

Contentful gives us the ability to have multiple space environments. By default, every space has one environment, called *master*. Addtional environments can be created to have a sandbox environment that would be isolated from master. For Popup.news we have a *develop* environment that you can use to try out changes before applying them to master. The *develop* environment is mapped to the develop branch and is deployed to Netlify automatically at: [https://develop--popupnewsroom.netlify.com](https://develop--popupnewsroom.netlify.com).

See [Managing multiple environments](https://www.contentful.com/developers/docs/concepts/multiple-environments/) on Contentful docs to learn more.

## Deploy settings on Netlify

Popup.news is deployed on Netlify. Adding a website on Netlify is super easy. All these settings are under [Build & Deploy](https://app.netlify.com/sites/popupnewsroom/settings/deploys) section of [Netlify's web app](https://app.netlify.com). Here are the main steps:

1. Select which Github repository and branch to deploy.
2. Specify this build command: `CONTENTFUL_ENVIRONMENT=master jekyll contentful --rebuild`
3. Add build environment variables `CONTENTFUL_PN_SPACE_ID` and `CONTENTFUL_PN_ACCESS_TOKEN`. `CONTENTFUL_ENVIRONMENT` is specified with the build command so no need to add it as an environment variable.
4. Add build hooks for Contentful's master and develop environment. Get the webhook urls using the [Contentful web app](https://app.contentful.com). Open the space and navigate to the *Settings > Webhooks*. You will see two webhooks already setup. See their details to copy the url or adjust what triggers it. See Contentful's [Intro to webhooks](https://www.contentful.com/developers/docs/concepts/webhooks/) to learn more.
5. To configure custom build command for deploying changes made to the Develop environment in Contentful, use Netlify's [Deploy Contexts](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts) to specify the build command in a [netlify.toml](https://github.com/meedan/popupnewsroom/blob/master/netlify.toml) file. To deploy develop use this build command: `CONTENTFUL_ENVIRONMENT=develop jekyll contentful --rebuild`

See [Continuous Deployment](https://www.netlify.com/docs/continuous-deployment) on Netlify docs to learn more.

## Handling Forms

Netlify comes with built-in form handling. Popup.news uses this functionality to capture the form data and posts a notification to Slack. See [Netlify Forms](https://www.netlify.com/docs/form-handling/) to learn more. 

The form's markup has to be hard-coded in a jekyll template file with a form tag defined per Netlify's documentation.

For example, the contact form's html is in [contact_form.html](https://github.com/meedan/popupnewsroom/blob/master/_includes/contact_form.html) and this file is included based on the form type specified in Contentful. The condition is set in [module_form.html](https://github.com/meedan/popupnewsroom/blob/master/_includes/module_form.html).

Now to add a new form:

1. Modify the Content Model of `[Form](https://app.contentful.com/spaces/a1gidpdiipum/content_types/form/fields)` by adding another type in the validations tab where it says _Accept only specified values_. You will only see one existing type `Contact`.

2. Create a new form markup in a file as done in [contact_form.html](https://github.com/meedan/popupnewsroom/blob/master/_includes/contact_form.html). Netlify uses the form `name` attribute to group the submissions in its web app. See the submissions [here](https://app.netlify.com/sites/popupnewsroom/forms).

3. Now modify the condition in `[module_form.html](https://github.com/meedan/popupnewsroom/blob/master/_includes/module_form.html)` to include the new form file based on the form type you defined in the first step.