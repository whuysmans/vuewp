# vuewp
Wordpress Twentyseventeen theme with Vue (VueJS) and GraphQL. Still in progress. You can find a demo here: [http://prutstuin.be](http://prutstuin.be).

### Install
+ git clone vuewp
+ cd vuewp
+ npm install

A graphql js client is included (Lokka). I had to set credentials to false in Lokka to fix cors-errors (see documentation in graphql-vuewp repo).

### Dependencies
+ wordpress backend of course
+ [graphql-vuewp](https://github.com/whuysmans/vuewp-graphql) plugin
+ acf if you want it

### Todo
+ fix cors in a more sustainable way
+ add animations
+ added seo meta by means of an extra Wordpress plugin, wich will be added here soon; Google manages to crawl the javascript, for Facebook however, the data arrive to late. So SSR is needed, but that is outside the scope of the project.
