# vuewp
Wordpress Twentyseventeen theme with Vue (VueJS) and GraphQL. Still in progress. You can find a demo here: [http://prutstuin.be](http://prutstuin.be). This demo is a decoupled setup: the front get its data from the WordPress install on another server. Read more on [this blogpost](https://conimpeto.be/wordpress/create-a-wordpress-twentyseventeen-theme-with-vuejs-and-graphql/).

### Install
+ git clone vuewp
+ cd vuewp
+ npm install

You can set the backend_url in constants.js.
A graphql js client is included (Lokka). 

### Dependencies
+ wordpress backend of course
+ [graphql-vuewp](https://github.com/whuysmans/vuewp-graphql) plugin
+ acf if you want it

### Todo
+ fix cors in a more sustainable way

### SEO
+ after a lot of trial and error, I decided to redirect the seo bots through mod_rewrite to the base WP install: SSR was not really an option; a node server on the backend was outside the scope of this demo, since my intent was to provide all backend functionality in a single WP plugin. It is probably bad, but it's working. I included a htaccess file for demonstration purposes.
