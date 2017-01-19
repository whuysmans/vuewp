<template>
  <div class="changing-content">
    <header class="page-header">
    	<h1 class="page-title">Author: <span class="vcard">{{ this.$route.params.slug }}</span></h1>
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
		  let body = document.querySelector('body')
		  // if( body.classList.length === 0 ) {
	        body.className = '';
	        body.classList.add( 'home', 'blog', 'archive', 'author', 'group-blog', 'hfeed', 'has-header-image', 'colors-light', 'customize-support', 'has-sidebar' )
	      // }
	      this.fetchPosts( { params: {
	        page: 1
	      } } )
	      this.$on( 'pagination', this.fetchPosts )
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
	        Object.assign( options.params, { per_page: 5 , author_name: this.$route.params.slug } )
	        queries.getAuthorPosts( options ).then( ( result ) => {
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