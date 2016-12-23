# vuewp
Testrepo for Vuejs GraphQL

### More documentation will follow soon
This project is in a very early stage now. Intention is to create a decoupled front (vue) for a WordPress backend. JSON data is retrieved trough GraphQL instead of the REST API. I added the graphql endpoint here: [graphql-vuewp](https://github.com/whuysmans/vuewp-graphql). I will put a demo online and provide the link here soon.

### Install
+ git clone vuewp
+ cd vuewp
+ npm install

A graphql js client is included (Lokka). I had to set credentials to false in Lokka to fix cors-errors (see documentation in graphql-vuewp repo).

### Dependencies
+ wordpress backend of course
+ graphql-vuewp plugin
+ yoast plugin if you want seo
+ acf if you want it

### Todo
+ fix cors in a more sustainable way
+ create a preview theme for WP backend
+ allow input from front
+ provide online demo
