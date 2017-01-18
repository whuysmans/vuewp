<template>
  <div class="changing-content">
  <header class="page-header">
    <h1 class="page-title">All Posts</h1>
  </header>
  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
      <Post v-for="post in posts" :post="post"></Post>
      <Pagination :class="{ 'hidden': hidePagination }" :totalPages="allPages" ></Pagination>
    </main>
  </div>
  </div>
</template>

<script>

import queries from '../queries'

	export default {
		created: function() {
      this.fetchPosts( { params: {
        page: 1
      } } )
      this.$on( 'pagination', this.fetchPosts )
      let body = document.querySelector('body')
      body.className = '';
      body.classList.add( 'home', 'blog', 'group-blog', 'hfeed', 'has-header-image', 
        'has-sidebar', 'colors-light', 'customize-support' )
		},
    
		data() {
			return {
				posts: [],
        allPages: 0
			}
		},

    beforeRouteLeave( to, from, next ) {
      this.$store.commit( 'resetCurrentPage' )
      next()
    },

		methods: {
      fetchPosts: function( options ) {
        Object.assign( options.params, { per_page: 5 } )
        queries.getAllPosts( options ).then( ( result ) => {
          this.$set( this, 'allPages', Math.ceil( result.wp_query.count / options.params.per_page ) )
          this.$set( this, 'posts', result.wp_query.posts )
        } )
      }
		},

    computed: {
      hidePagination: function() {
        return this.posts.length < 5
      }
    }

	}
</script>

	
