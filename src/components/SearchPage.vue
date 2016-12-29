<template>
	<section id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<header class="page-header">
				<h1 class="page-title">Search Results for: 
					<span>{{ this.$route.query.term }}</span>
				</h1>
			</header>
			<Post v-for="post in posts" :post="post"></Post>
		</main>
	</section>
</template>

<script>
import queries from '../queries'

export default {
	created: function() {
		if( this.$store.state.searchResults.length !== 0) {
			this.posts = this.$store.state.searchResults
		} else {
			this.doSearch()
			let body = document.querySelector('body')
			body.className = ''
			body.classList.add( 'search', 'search-results', 'group-blog', 'has-header-image',
			 'has-sidebar', 'colors-light', 'customize-support' )
		}
	},
	watch: {
	    '$route' ( to, from ) {
	      this.posts = this.$store.state.searchResults
	    }
  	},
	data() {
		return {
			posts: []
		}
	},
	methods: {
		doSearch: function() {
			let searchTerm = this.$route.query.term
			if( searchTerm && searchTerm !== "" ) {
				const options = { 
					params: {
						search: searchTerm,
						page: 1,
						per_page: 5
					}
				}
				queries.getSearchResults( options ).then( ( result ) => {
          			this.$set( this, 'posts', result.wp_query.posts )
          			this.$store.commit( 'setSearchResults', result.wp_query.posts )
				} )
			}
		}
	}
}
</script>