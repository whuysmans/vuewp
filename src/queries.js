import constants from './constants'

const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const client = new Lokka({
  transport: new Transport(constants.GRAPHQL_URL)
})

export default {
  getAllPosts: function (options) {
    const query = `
      query postsQuery($page: Int, $per_page: Int) {
        wp_query {
          posts(posts_per_page: $per_page, paged: $page) {
            title,
            ID,
            content,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date,
            thumbnail_url,
            slug,
            sticky,
            acf
          },
          count
        }
      }
    `
    const vars = { 'page': options.params.page, 'per_page': options.params.per_page }
    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getCustomType: function (options) {
    const query = `
      query postsQuery($page: Int, $per_page: Int, $name: String, $type:[String]) {
        wp_query {
          posts(posts_per_page: $per_page, paged: $page, post_type: $type, name: $name) {
            title,
            ID,
            content,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date,
            thumbnail_url,
            slug,
            acf
          },
          count
        }
      }
    `
    const vars = { 'page': options.params.page, 'per_page': options.params.per_page , 
      'type': [options.params.type] }
    if( options.params.name ) {
      Object.assign( vars, { 'name': options.params.name } )
    }
    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        console.log(result)
        resolve(result)
      })
    })
  },

  getPage: function (slug) {
    const query = `
      query myQuery($slug: String) {
        wp_query {
          posts(post_type: "page", name: $slug) {
            title,
            ID,
            content,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date,
            thumbnail_url,
            slug
          },
          count
        }
      }
    `
    const vars = { 'slug': slug }
    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getCategoryPosts: function (options) {
    const query = `
      query myQuery($slug: String, $page: Int, $per_page: Int) {
        wp_query {
          posts(category_name: $slug, posts_per_page: $per_page, paged: $page) {
            title,
            ID,
            content,
            slug,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date,
            thumbnail_url
          },
          count
        }
      }
    `
    const vars = { 'slug': options.params.slug, 'page': options.params.page, 'per_page': options.params.per_page }

    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getTagPosts: function (options) {
    const query = `
      query myQuery($slug: String, $page: Int, $per_page: Int) {
        wp_query {
          posts(tag: $slug, posts_per_page: $per_page, paged: $page) {
            title,
            ID,
            content,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date,
            thumbnail_url,
            slug
          },
          count
        }
      }
    `
    const vars = { 'slug': options.params.slug, 'page': options.params.page, 'per_page': options.params.per_page }

    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getAuthorPosts: function (options) {
    const query = `
      query myQuery($author: Int, $page: Int, $per_page: Int) {
        wp_query {
          posts(author: $author, paged: $page, posts_per_page: $per_page) {
            title,
            ID,
            content,
            slug,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date
          },
          count
        }
      }
    `
    const vars = { 'author': options.params.author, 'page': options.params.page, 'per_page': options.params.per_page }

    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getMenu: function (name) {
    const query = `
      query menuQuery($name: String!) {
        wp_query {
          menu(name: $name) {
            ID,
            id,
            guid,
            classes,
            url,
            title,
            target,
            parent
          }
        }
      }
    `
    const vars = { 'name': name }
    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getSearchResults: function( options ) {
    const query = `
      query postsQuery($page: Int, $per_page: Int, $search: String) {
        wp_query {
          posts(posts_per_page: $per_page, paged: $page, s: $search) {
            title,
            ID,
            content,
            terms(taxonomy: "category") {
              slug,
              term_id,
              taxonomy
            },
            tags(taxonomy: "post_tag") {
              slug,
              term_id,
              taxonomy
            },
            author {
              name,
              url,
              avatar,
              id
            },
            date,
            thumbnail_url,
            slug
          },
          count
        }
      }
    `
    const vars = { 'page': options.params.page, 'per_page': options.params.per_page, 
                      'search': options.params.search }
    return new Promise(function (resolve, reject) {
      client.query(query, vars).then(result => {
        resolve(result)
      })
    })
  },

  getBlogInfo: function() {
    const query = `
      query infoQuery {
        wp_query {
          bloginfo {
            wpurl,
            blogname,
            description
          },
          header_image
        }
      }
    `
    return new Promise(function( resolve, reject ) {
      client.query(query).then( result => {
        resolve( result )
      })
    })
  },

  getSEO: function( url ) {
    const query = `
      query seoQuery($url: String) {
        wp_query {
          yoast(url: $url) {
            title
            viewport
            description
            og_locale
            og_type
            og_description
            og_url
            og_site_name
            twitter_card
            twitter_description
            twitter_title
            generator
          }
        }
      }
    `
    const vars = { 'url': url }
    return new Promise(function(resolve, reject) {
      client.query(query, vars).then((result) => {
        resolve(result)
      })
    })
  },

  getCustomPostTypes: function() {
    const query = `
      query info {
        wp_query {
          post_types
        }
      }
    `
    return new Promise( ( resolve, reject ) => {
      client.query( query ).then( ( result ) => {
        resolve(result)
      } )
    } )
  },

  getTerms: function( taxonomy ) {
    const query = `
      query termQuery($taxonomy: String) {
        wp_query {
          terms(taxonomy: $taxonomy) {
            slug,
            term_id,
            description
          }
        }
      }
    `
    const vars = { "taxonomy": taxonomy }
    return new Promise( ( resolve, reject ) => {
      client.query( query, vars ).then( ( result ) => {
        console.log( result )
        resolve( result )
      } )
    } )
  }

}

