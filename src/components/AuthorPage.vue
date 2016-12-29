<template>
  <main id="main" class="site-main" role="main">
    <header class="page-header">
    	<h1 class="page-title">Author: <span class="vcard">{{ this.$route.params.slug }}</span></h1>
    </header>
    <Post v-for="post in posts" :post="post"></Post>
    <Pagination :totalPages="allPages"></Pagination>
  </main>
</template>

<script>
	
	import queries from '../queries'

	export default {

		created: function() {
	      this.fetchPosts( { params: {
	        page: 1
	      } } )
	      this.$on( 'pagination', this.fetchPosts )
		},

		data() {
			return {
				posts: '',
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
		}

	}


</script>