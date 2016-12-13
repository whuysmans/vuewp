const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const client = new Lokka({
  transport: new Transport('http://vuetest.dev/graphql')
})

import {
	RECEIVE_ALL_POSTS,
	RECEIVE_POST,
	RECEIVE_ALL_PAGES,
	RECEIVE_PAGE,
	RECEIVE_CATEGORY_PAGES,
	RECEIVE_TAG_PAGES,
	RECEIVE_AUTHOR_PAGES
} from './mutations'

export const getAllPosts = ( { dispatch }, options ) => {
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
            slug
          },
          count
        }
      }
    `
    const vars = { 'page': options.params.page, 'per_page': options.params.per_page }
    client.query(query, vars).then( result => {
        dispatch( RECEIVE_ALL_POSTS, result.wp_query.posts )
    })
}