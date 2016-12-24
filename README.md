# vuewp
Testrepo for Vuejs GraphQL

### More documentation will follow soon
This project is still in an early stage. Intention is to create a decoupled front (vue) for a WordPress backend. JSON data is retrieved trough GraphQL instead of the REST API. I added the graphql endpoint here: [graphql-vuewp](https://github.com/whuysmans/vuewp-graphql). I did put a demo online: [http://prutstuin.be](http://prutstuin.be)

### Install
+ git clone vuewp
+ cd vuewp
+ npm install

A graphql js client is included (Lokka). I had to set credentials to false in Lokka to fix cors-errors (see documentation in graphql-vuewp repo).

### Dependencies
+ wordpress backend of course
+ graphql-vuewp plugin
+ acf if you want it

### Todo
+ fix cors in a more sustainable way
+ create a preview theme for WP backend
+ allow input from front
+ provide online demo
